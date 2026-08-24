import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService, SelectItem } from 'primeng/api';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { SharedModule } from '@/shared.module';
import { paymentModeList } from 'src/app/shared/models/commons/selectItems';
import { StudentFeeLedger, StudentFeeLedgerExpando } from 'src/app/shared/models/finance-Pro/student-fee-ledger-report';
import { ReportsService } from '../../../services/finance-pro/reports.service';

@Component({
  selector: 'app-student-fee-ledger',
  standalone: true,
  templateUrl: './student-fee-ledger.component.html',
  styleUrl: './student-fee-ledger.component.scss',
  imports: [SharedModule],
  providers: [MessageService]
})
export class StudentFeeLedgerComponent implements OnInit {
  studentFeeLedgerExpando!: StudentFeeLedgerExpando;
  studentFeeLedgerList: StudentFeeLedger[] = [];
  groupByOperationalVerticalList: GroupByOperationalVertical[] = [];
  paymentModeList: SelectItem[] = paymentModeList;
  @Input() studentId: string = '';
  private previousStudentId: string = '';

  constructor(
    private reportsService: ReportsService,
    private messageService: MessageService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      debounceTime(300),
      distinctUntilChanged((prev, curr) => prev.get('studentId') === curr.get('studentId'))
    ).subscribe(params => {
      const newStudentId = params.get('studentId') || '';
      if (newStudentId && newStudentId !== this.previousStudentId) {
        this.clearSessionStorage();
        this.studentId = newStudentId;
        this.previousStudentId = newStudentId;
        const cachedData = this.getCachedData(newStudentId);
        if (cachedData) {
          this.studentFeeLedgerExpando = cachedData;
          this.processFeeLedgerData();
        } else {
          this.getFeeLedgerData(newStudentId);
        }
      }
    });
  }

  private getCachedData(studentId: string): StudentFeeLedgerExpando | null {
    const cachedData = sessionStorage.getItem(`studentFeeLedger_${studentId}`);
    if (cachedData) {
      try {
        return JSON.parse(cachedData) as StudentFeeLedgerExpando;
      } catch (e) {
        console.error('Error parsing cached data:', e);
        return null;
      }
    }
    return null;
  }

  private saveCachedData(studentId: string, data: StudentFeeLedgerExpando) {
    try {
      sessionStorage.setItem(`studentFeeLedger_${studentId}`, JSON.stringify(data));
    } catch (e) {
      console.error('Error saving to sessionStorage:', e);
    }
  }

  private clearSessionStorage() {
    if (this.previousStudentId) {
      sessionStorage.removeItem(`studentFeeLedger_${this.previousStudentId}`);
    }
  }

  getFeeLedgerData(studentId: string) {
    this.reportsService.getStudentFeeLedgerExpandoByStudentId(studentId).subscribe({
      next: (response) => {
        this.studentFeeLedgerExpando = response;
        this.saveCachedData(studentId, response);
        this.processFeeLedgerData();
      },
      error: (err) => {
        console.error('Error fetching fee ledger data:', err);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to fetch fee ledger data', life: 3000 });
      }
    });
  }

  processFeeLedgerData() {
    this.studentFeeLedgerList = this.studentFeeLedgerExpando.studentFeeLedgerList
      ? this.studentFeeLedgerExpando.studentFeeLedgerList.map(fee => {
        const vertical = this.studentFeeLedgerExpando.operationalVerticalExpandoList?.find(v => v.id === fee.operationalVerticalId);
        const paymentModeName = this.paymentModeList?.find(f => f.value == fee.paymentMode?.toString())?.label ?? '';
        return {
          ...fee,
          operationalVerticalName: vertical ? vertical.name : `Unknown Vertical ${fee.operationalVerticalId}`,
          operationalVerticalId: fee.operationalVerticalId,
          paymentModeName: paymentModeName ? paymentModeName : ''
        };
      })
      : [];

    if (this.studentFeeLedgerList.length > 0) {
      this.groupByOperationalVerticalList = this.groupByOperationalVertical(this.studentFeeLedgerList);
    }
  }

  groupByOperationalVertical(data: StudentFeeLedger[]): GroupByOperationalVertical[] {
    const map = new Map<number, StudentFeeLedger[]>();
    for (const item of data) {
      const key = item.operationalVerticalId || 0;
      if (!map.has(key)) {
        map.set(key, []);
      }
      map.get(key)?.push(item);
    }

    const groupedList = Array.from(map.entries()).map(([operationalVerticalId, studentFeeLedgerList]) => {
      const vertical = this.studentFeeLedgerExpando.operationalVerticalExpandoList?.find(v => v.id === operationalVerticalId);
      return {
        operationalVerticalId,
        operationalVerticalName: vertical ? vertical.name : `Unknown Vertical ${operationalVerticalId}`,
        studentFeeLedgerList
      };
    });

    return groupedList.sort((a, b) => (a.operationalVerticalId) - b.operationalVerticalId);
  }

  calculateTotalAmount(fees: StudentFeeLedger[]): number {
    const uniqueComponents = new Set<number>();
    let sum = 0;
    for (const fee of fees) {
      const compId = fee.feeComponentId;
      if (!uniqueComponents.has(compId || 0)) {
        uniqueComponents.add(compId || 0);
        sum += (fee.feeAmount || 0);
      }
    }
    return sum;
  }

  calculateTotalPaid(fees: StudentFeeLedger[]): number {
    return fees.reduce((sum, fee) => sum + (fee.paidAmount || 0), 0);
  }


  calculateTotalDue(fees?: StudentFeeLedger[]): number {
    if (!fees) {
      // Calculate overall dues across all groups
      return this.groupByOperationalVerticalList.reduce((sum, group) => {
        return sum + this.calculateTotalDue(group.studentFeeLedgerList);
      }, 0);
    }
    // Calculate dues for a specific group
    return this.calculateTotalAmount(fees) - this.calculateTotalPaid(fees);
  }

  refresh(): void {
    if (this.studentId) {
      this.clearSessionStorage();
      this.getFeeLedgerData(this.studentId);
    }
  }
}

interface GroupByOperationalVertical {
  operationalVerticalId: number;
  operationalVerticalName: string | undefined;
  studentFeeLedgerList: StudentFeeLedger[];
}