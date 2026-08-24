import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService, SelectItem } from 'primeng/api';
import { SharedModule } from '@/shared.module';
import { StudentProgram } from 'src/app/shared/models/mindspark/student-program';
import { BatchAttendance } from 'src/app/shared/models/students/batch-attendance';
import { BatchAttendanceSummary } from 'src/app/shared/models/students/batch-attendance-summary';
import { OperationalVertical } from 'src/app/shared/models/students/operational-vertical';
import { BatchAttendanceService } from '../../services/batch-attendance.service';
import { StudentProgramService } from '../../services/student-program.service';

@Component({
  selector: 'app-batch-attendance-summary',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './batch-attendance-summary.component.html',
  styleUrl: './batch-attendance-summary.component.scss'
})
export class BatchAttendanceSummaryComponent implements OnInit {
  attendanceReportGroup!: FormGroup;

  studentProgramList: StudentProgram[] = [];
  operationalVerticalList: OperationalVertical[] = [];
  batchAttendanceSummaryList: BatchAttendanceSummary[] = [];
  batchAttendanceList: BatchAttendance[] = [];
  filteredBatchAttendanceList: BatchAttendance[] = [];

  programSelectItemList: SelectItem[] = [];

  programName: string = "";
  rowGroupMetadata: any;
  list: any[] = [];
  list1: any[] = [];
  dataKey = 'id';
  isLoading: boolean = false;
  isAttendenceHidden: boolean = true;
  skeletonValue: number[] = Array(4).fill(1);

  visible: boolean = false;
  cols = [
    { field: 'PaperCode', header: 'PaperCode', filterType: 'text' },
    { field: 'Subject', header: 'Subject', filterType: 'text' },
    { field: 'Batch Code', header: 'Batch Code', filterType: 'text' },
    { field: 'Scheduled', header: 'Scheduled', filterType: 'text' },
    { field: 'Conducted', header: 'Conducted', filterType: 'text' },
    { field: 'Present', header: 'Present', filterType: 'text' },
    { field: 'Absent', header: 'Absent', filterType: 'text' },
    { field: 'Attendance(%)', header: 'Attendance(%)', filterType: 'text' },

  ];

  modelHeaderString: string = "Batch Attendance Details";
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService,
    private batchAttendanceService: BatchAttendanceService,
    private studentProgramService: StudentProgramService
  ) {

  }

  ngOnInit(): void {
    this.initializeAttendanceReportGroup();
    this.bindStudentPrograms();
  }

  showDialog(subjectPaperCodeId: number) {
    this.visible = true;
    this.filteredBatchAttendanceList = this.batchAttendanceList
      .filter(x => x.subjectPaperCodeId === subjectPaperCodeId)
      .sort((a, b) => (a.date ?? '').localeCompare(b.date ?? ''));

    this.modelHeaderString = `Batch Attendance Details - Subject Paper Code: ${this.filteredBatchAttendanceList[0]?.subjectPaperCodeName || ''
      }, Total Records: ${this.filteredBatchAttendanceList.length}, Total Present: ${this.filteredBatchAttendanceList.filter(x => x.isPresent).length
      }, Total Absent: ${this.filteredBatchAttendanceList.filter(x => !x.isPresent).length}`;
  }

  initializeAttendanceReportGroup() {
    this.attendanceReportGroup = this.fb.group({
      id: 0,
      programName: ['', Validators.required],
      registrationNumber: ['', Validators.required],
    });
  }

  getBatchAttendanceByRegistrationNumber(registrationNumber: string) {

    this.batchAttendanceService.getByRegistrationNumber(registrationNumber).subscribe({
      next: (response) => {
        this.batchAttendanceList = response;
      },
      error: (error: { error: { message: any; }; }) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message, life: 3000 });
      }
    })
  }

  bindStudentPrograms() {
    this.programSelectItemList = [];
    this.operationalVerticalList = [];

    this.studentProgramService.getStudentProgramList().subscribe({
      next: (x) => {
        this.studentProgramList = x.filter(k => k.status == "PUBLISHED");

        if (this.studentProgramList && this.studentProgramList[0].registrationNumber) {
          // this.getBatchAttendanceSummaryByRegistrationNumber(this.studentProgramList[0].registrationNumber);
          this.getBatchAttendanceByRegistrationNumber(this.studentProgramList[0].registrationNumber);
        }

        for (let i = 0; i < this.studentProgramList.length; i++) {
          this.list.push({
            label: this.studentProgramList[i].programName,
            value: this.studentProgramList[i].programId
          });
          this.list1.push({
            label: this.studentProgramList[i].operationalVerticalName,
            value: this.studentProgramList[i].operationalVerticalId
          });
        }

        this.programSelectItemList = this.list.reduce((accumulator, current) => {
          if (!accumulator.some((x: { label: any; value: any; }) => x.label === current.label && x.value === current.value)) {
            accumulator.push(current);
          }
          return accumulator;
        }, []);

        this.operationalVerticalList = this.list1.reduce((accumulator, current) => {
          if (!accumulator.some((x: { label: any; value: any; }) => x.label === current.label && x.value === current.value)) {
            accumulator.push(current);
          }
          return accumulator;
        }, []);
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: error.error.message,
          life: 3000
        });
      }
    });

  }

  onProgamChanged(event: any) {
    this.attendanceReportGroup.controls['registrationNumber'].reset()
    var fileterdStudentProgram = this.studentProgramList.filter(k => k.programId == event.value);
    this.attendanceReportGroup.value.registrationNumber = fileterdStudentProgram[0].registrationNumber;
    this.programName = event.originalEvent.currentTarget.ariaLabel;
    // this.getBatchAttendanceSummaryByRegistrationNumber(this.attendanceReportGroup.value.registrationNumber);
    this.getBatchAttendanceByRegistrationNumber(this.attendanceReportGroup.value.registrationNumber);
  }

  getBatchAttendanceSummaryByRegistrationNumber(registrationNumber: string) {
    this.batchAttendanceSummaryList = [];
    this.isLoading = true;
    this.isAttendenceHidden = false;
    this.batchAttendanceService.getBatchAttendanceByRegistrationNumber(registrationNumber).subscribe({
      next: (p) => {
        p.forEach(v => {
          v.operationalVertical = {
            id: v.operationalVerticalId,
            name: v.operationalVerticalName,
          };
        });
        this.batchAttendanceSummaryList = p.sort((a, b) => (a.subjectPaperCodeName ?? '').localeCompare(b.subjectPaperCodeName ?? ''));
        this.isLoading = false;
      }, error: (error) => {
        this.isLoading = false;
        this.messageService.add({ severity: 'warn', summary: 'Error', detail: error, life: 3000 });
      }
    });
  }
  onSort() {
    this.updateRowGroupMetaData();
  }

  updateRowGroupMetaData() {
    this.rowGroupMetadata = {};

    if (this.batchAttendanceSummaryList) {
      for (let i = 0; i < this.batchAttendanceSummaryList.length; i++) {
        const rowData = this.batchAttendanceSummaryList[i];
        const ovsName = rowData.operationalVertical?.name ?? 'Unknown';
        if (i === 0) {
          this.rowGroupMetadata[ovsName] = { index: 0, size: 1 };
        } else {
          const previousRowData = this.batchAttendanceSummaryList[i - 1];
          const previousRowGroup = previousRowData.operationalVertical?.name ?? 'Unknown';
          if (ovsName === previousRowGroup) {
            this.rowGroupMetadata[ovsName].size++;
          } else {
            this.rowGroupMetadata[ovsName] = { index: i, size: 1 };
          }
        }
      }
    }

  }

}
