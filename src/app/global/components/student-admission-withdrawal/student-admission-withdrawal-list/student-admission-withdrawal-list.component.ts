import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ExcelFileProcessService } from 'src/app/global/services/file-process/excel-file-process.service';
import { WithdrawalService } from 'src/app/global/services/student-admission-withdrawal/withdrawal.service';
import { SharedModule } from '@/shared.module';
import { Withdraw } from 'src/app/shared/models/student-onboarding/withdraw';

@Component({
  selector: 'app-student-admission-withdrawal-list',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './student-admission-withdrawal-list.component.html',
  styleUrl: './student-admission-withdrawal-list.component.scss'
})
export class StudentAdmissionWithdrawalListComponent implements OnInit {

  studentOnBoardingWithdrawalList: Withdraw[] = [];
  componentName = 'Student Admission Withdrawal';
  @ViewChild('searchInput', { static: false }) searchInput: any;
  @Input() currentModuleNameTo?: string;
  iconClass!: string;

  constructor(private withdrawalService: WithdrawalService,
    private messageService: MessageService,
    private excelFileProcessService: ExcelFileProcessService,
    private router: Router,) { }

  ngOnInit(): void {
    if (this.currentModuleNameTo == 'mindspark') {
      this.iconClass = 'fas fa-brain'
    } else if (this.currentModuleNameTo == 'finpro') {
      this.iconClass = 'fas fa-indian-rupee-sign'
    } else if (this.currentModuleNameTo == 'bigleads') {
      this.iconClass = 'fas fa-briefcase'
    }

    this.withdrawalService.getStudentOnBoardingWithdrawal().subscribe({
      next: (response) => {
        this.studentOnBoardingWithdrawalList = response;
      },
      error: (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error ', detail: error.message, life: 3000 });
      }
    })
  }
  clear(table: Table) {
    table.clear();
    if (this.searchInput) {
      this.searchInput.nativeElement.value = '';
    }
  }
  viewStudentOnboardingWithdrawalDetail(withdraw: Withdraw) {
    this.router.navigateByUrl("/home/" + this.currentModuleNameTo + "/transactions/student-admission-withdrawal-view/" + withdraw.id);
  }

  exportExcel() {
    this.excelFileProcessService.exportAsExcelFile<Withdraw[]>(this.studentOnBoardingWithdrawalList, "Student Admission Withdrawal");
  }
}
