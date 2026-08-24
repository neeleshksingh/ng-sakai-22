import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { forkJoin } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { BatchAttendanceService as GlobalBatchAttendanceService } from 'src/app/global/services/mindspark/batch-attendance.service';
import { BatchAttendanceService } from 'src/app/mind-spark/services/batch-attendance.service';
import { BatchService } from 'src/app/mind-spark/services/batch.service';
import { SharedModule } from '@/shared.module';
import { BatchAttendance } from 'src/app/shared/models/mindspark/batch-attendance';
import { BatchResponse } from 'src/app/shared/models/mindspark/batch';
import { StudentBatchAttendance } from 'src/app/shared/models/mindspark/student-batch-attendance';
import { StudentBatchAttendanceSummaryDataResponse, StudentBatchAttendanceSummaryRegistrationNumberWise } from 'src/app/shared/models/mindspark/student-batch-attendance-report';

@Component({
  selector: 'app-student-academic-report',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './student-academic-report.component.html',
  styleUrl: './student-academic-report.component.scss'
})
export class StudentAcademicReportComponent implements OnInit {
  studentBatchAttendanceSummaryDataResponse?: StudentBatchAttendanceSummaryDataResponse;
  studentBatchAttendance: StudentBatchAttendance[] = [];
  studentBatchAttendanceSummaryRegistrationNumberWise: StudentBatchAttendanceSummaryRegistrationNumberWise[] = [];
  arrays: any[] = [];
  batch?: BatchResponse;
  isBatchCodeDetailsViewDialog: boolean = false;
  isAttendanceDetailsDialog: boolean = false;
  batchAttendanceDetails: BatchAttendance[] = [];
  filteredBatchAttendanceDetails: BatchAttendance[] = [];
  attendanceDetailsHeader: string = 'Batch Attendance Details';
  @Input() studentId: string = '';
  private previousStudentId: string = '';
  showPannel: boolean = true;

  constructor(
    private batchAttendanceService: BatchAttendanceService,
    private globalBatchAttendanceService: GlobalBatchAttendanceService,
    private batchService: BatchService,
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
          this.studentBatchAttendanceSummaryDataResponse = cachedData.summary;
          this.studentBatchAttendance = cachedData.attendance;
          if (this.studentBatchAttendanceSummaryDataResponse?.studentAttendanceSummaryList?.length && this.studentBatchAttendance.length) {
            this.dataManipulationBatchAttendance();
            this.loadBatchAttendanceDetails();
          } else {
            this.messageService.add({ severity: 'warn', summary: 'Warning', detail: 'No cached data available', life: 3000 });
          }
        } else {
          this.getBatchAttendanceByStudentId(newStudentId);
        }
      }
    });
  }

  private getCachedData(studentId: string): { summary: StudentBatchAttendanceSummaryDataResponse, attendance: StudentBatchAttendance[] } | null {
    const cachedSummary = sessionStorage.getItem(`studentBatchAttendanceSummary_${studentId}`);
    const cachedAttendance = sessionStorage.getItem(`studentBatchAttendance_${studentId}`);
    if (cachedSummary && cachedAttendance) {
      try {
        return {
          summary: JSON.parse(cachedSummary) as StudentBatchAttendanceSummaryDataResponse,
          attendance: JSON.parse(cachedAttendance) as StudentBatchAttendance[]
        };
      } catch (e) {
        console.error('Error parsing cached data:', e);
        return null;
      }
    }
    return null;
  }

  private saveCachedData(studentId: string, summary: StudentBatchAttendanceSummaryDataResponse, attendance: StudentBatchAttendance[]) {
    try {
      sessionStorage.setItem(`studentBatchAttendanceSummary_${studentId}`, JSON.stringify(summary));
      sessionStorage.setItem(`studentBatchAttendance_${studentId}`, JSON.stringify(attendance));
    } catch (e) {
      console.error('Error saving to sessionStorage:', e);
    }
  }

  private clearSessionStorage() {
    if (this.previousStudentId) {
      sessionStorage.removeItem(`studentBatchAttendanceSummary_${this.previousStudentId}`);
      sessionStorage.removeItem(`studentBatchAttendance_${this.previousStudentId}`);
    }
  }

  getBatchAttendanceByStudentId(studentId: string) {
    this.showPannel = false;
    forkJoin([
      this.batchAttendanceService.GetStudentBatchAttendanceSummaryDataExpandoByStudentId(studentId),
      this.batchAttendanceService.getBatchAttendanceByStudentId(studentId, 10)
    ]).subscribe({
      next: ([summaryResponse, attendanceResponse]) => {
        this.studentBatchAttendanceSummaryDataResponse = summaryResponse;
        this.studentBatchAttendance = attendanceResponse || [];
        if (this.studentBatchAttendanceSummaryDataResponse?.studentAttendanceSummaryList?.length && this.studentBatchAttendance.length) {
          this.saveCachedData(studentId, this.studentBatchAttendanceSummaryDataResponse, this.studentBatchAttendance);
          this.dataManipulationBatchAttendance();
          this.loadBatchAttendanceDetails();
          this.showPannel = true;
        } else {
          this.showPannel = false;
          this.messageService.add({ severity: 'warn', summary: 'Warning', detail: 'No data received', life: 3000 });
        }
      },
      error: err => {
        this.showPannel = false;
        console.error('Error fetching data:', err);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to fetch attendance data', life: 3000 });
      }
    });
  }

  refresh(): void {
    if (this.studentId) {
      this.clearSessionStorage();
      this.getBatchAttendanceByStudentId(this.studentId);
    }
  }

  private loadBatchAttendanceDetails(): void {
    const registrationNumbers = [...new Set(
      (this.studentBatchAttendanceSummaryDataResponse?.studentAttendanceSummaryList || [])
        .map(item => item.registrationNumber)
        .filter((registrationNumber): registrationNumber is string => !!registrationNumber)
    )];

    if (registrationNumbers.length === 0) {
      this.batchAttendanceDetails = [];
      return;
    }

    forkJoin(
      registrationNumbers.map(registrationNumber =>
        this.globalBatchAttendanceService.getBatchAttendanceByRegistrationNumber(registrationNumber)
      )
    ).subscribe({
      next: responses => {
        this.batchAttendanceDetails = responses.flat();
      },
      error: err => {
        this.batchAttendanceDetails = [];
        this.messageService.add({ severity: 'warn', summary: 'Warning', detail: err.error?.message || 'Failed to fetch attendance details', life: 3000 });
      }
    });
  }

  showAttendanceDetails(subjectPaperCodeId: number, registrationNumber?: string): void {
    this.filteredBatchAttendanceDetails = this.batchAttendanceDetails
      .filter(attendance => attendance.subjectPaperCodeId === subjectPaperCodeId && attendance.registrationNumber === registrationNumber)
      .sort((first, second) => (first.date?.toString() ?? '').localeCompare(second.date?.toString() ?? ''));

    const attendance = this.filteredBatchAttendanceDetails[0];
    this.attendanceDetailsHeader = `Batch Attendance Details - Subject Paper Code: ${attendance?.subjectPaperCodeName || ''}, Total Records: ${this.filteredBatchAttendanceDetails.length}, Total Present: ${this.filteredBatchAttendanceDetails.filter(item => item.isPresent).length}, Total Absent: ${this.filteredBatchAttendanceDetails.filter(item => !item.isPresent).length}`;
    this.isAttendanceDetailsDialog = true;
  }

  dataManipulationBatchAttendance() {
    this.studentBatchAttendanceSummaryRegistrationNumberWise = [];

    const uniqueRegistrationNumber = [
      ...new Set(
        (this.studentBatchAttendanceSummaryDataResponse?.studentAttendanceSummaryList || []).map(item => item.registrationNumber)
      )
    ];

    if (uniqueRegistrationNumber.length === 0) {
      console.warn('No unique registration numbers found');
      return;
    }

    for (let i = 0; i < uniqueRegistrationNumber.length; i++) {
      const registrationNumber = uniqueRegistrationNumber[i];
      const summaryList = this.studentBatchAttendanceSummaryDataResponse?.studentAttendanceSummaryList || [];

      let uniqueOVs = [
        ...new Set(summaryList.filter(x => x.registrationNumber === registrationNumber).map(item => item.operationalVerticalId))
      ].sort((a, b) => (a ?? 0) - (b ?? 0));

      this.studentBatchAttendanceSummaryRegistrationNumberWise.push({
        programNameWithRegistrationNumber: `${registrationNumber} - ${(this.studentBatchAttendanceSummaryDataResponse?.programExpando || [])
          .find(x => x.id === summaryList.find(s => s.registrationNumber === registrationNumber)?.programId)?.name || ''
          }`,
        registrationNumber,
        studentBatchAttendanceSummaryOperationalVerticalWise: []
      });

      for (let j = 0; j < uniqueOVs.length; j++) {
        const ovId = uniqueOVs[j];
        const totalPresent = summaryList
          .filter(x => x.operationalVerticalId === ovId)
          .reduce((sum, a) => sum + (a.totalPresent ?? 0), 0);

        let totalClassConducted = 0;
        let totalPresentForCreditUnitZero = 0;
        let totalClassConductedForCreditUnitZero = 0;

        if ((this.studentBatchAttendanceSummaryDataResponse?.subjectPaperCodeSummaryList || []).length > 0) {
          totalClassConducted = (this.studentBatchAttendanceSummaryDataResponse?.subjectPaperCodeSummaryList || [])
            .filter(x => x.operationalVerticalId === ovId)
            .reduce((sum, a) => sum + (a.totalClassConducted ?? 0), 0);

          const classConductedForCreditUnitZero = summaryList.filter(x => x.operationalVerticalId === ovId && x.creditUnit === 0);
          if (classConductedForCreditUnitZero.length > 0) {
            totalClassConductedForCreditUnitZero = (this.studentBatchAttendanceSummaryDataResponse?.subjectPaperCodeSummaryList || [])
              .filter(x => x.subjectPaperCodeId === classConductedForCreditUnitZero[0]?.subjectPaperCodeId)
              .reduce((sum, a) => sum + (a.totalClassConducted ?? 0), 0);

            totalPresentForCreditUnitZero = classConductedForCreditUnitZero
              .reduce((sum, a) => sum + (a.totalPresent ?? 0), 0);
          }
        }

        this.studentBatchAttendanceSummaryRegistrationNumberWise[i].studentBatchAttendanceSummaryOperationalVerticalWise.push({
          operationalVertical: (this.studentBatchAttendanceSummaryDataResponse?.operationalVerticalExpando || [])
            .find(x => x.id === ovId)?.name || '',
          studentBatchAttendanceReport: [],
          aggregateAttendance: (this.studentBatchAttendanceSummaryDataResponse?.operationalVerticalAttendancePercentageList || [])
            .find(x => x.operationalVerticalId === ovId)?.aggregateAttendancePercentage ?? 0,
          isRecentAttendanceDisplay: j === uniqueOVs.length - 1
        });

        const filterOvs = summaryList.filter(x => x.operationalVerticalId === ovId);
        for (let k = 0; k < filterOvs.length; k++) {
          const ov = filterOvs[k];
          let teacherName = this.arrays.find(a => a.employeeCode === ov.primaryFacultyCode)?.employeeName || '';

          this.studentBatchAttendanceSummaryRegistrationNumberWise[i].studentBatchAttendanceSummaryOperationalVerticalWise[j].studentBatchAttendanceReport.push({
            studentId: '',
            registrationNumber: '',
            academicSessionId: Number(
              (this.studentBatchAttendanceSummaryDataResponse?.academicSessionExpando || [])
                .find(x => x.id === ov.academicSessionId)?.id || 0
            ),
            academicSessionName: (this.studentBatchAttendanceSummaryDataResponse?.academicSessionExpando || [])
              .find(x => x.id === ov.academicSessionId)?.name || '',
            programId: 0,
            programName: (this.studentBatchAttendanceSummaryDataResponse?.programExpando || [])
              .find(x => x.id === ov.programId)?.name || '',
            operationalVerticalId: 0,
            operationalVerticalName: (this.studentBatchAttendanceSummaryDataResponse?.operationalVerticalExpando || [])
              .find(x => x.id === ov.operationalVerticalId)?.name || '',
            operationalVerticalType: '',
            subjectPaperCodeId: Number(
              (this.studentBatchAttendanceSummaryDataResponse?.subjectPaperCodeExpando || [])
                .find(x => x.id === ov.subjectPaperCodeId)?.id || 0
            ),
            subjectPaperCodeName: (this.studentBatchAttendanceSummaryDataResponse?.subjectPaperCodeExpando || [])
              .find(x => x.id === ov.subjectPaperCodeId)?.name || '',
            subjectId: Number(
              (this.studentBatchAttendanceSummaryDataResponse?.subjectExpando || [])
                .find(x => x.id === ov.subjectId)?.id || 0
            ),
            subjectName: (this.studentBatchAttendanceSummaryDataResponse?.subjectExpando || [])
              .find(x => x.id === ov.subjectId)?.name || '',
            batchCode: ov.batchCode,
            section: ov.section,
            recentAttendance: this.studentBatchAttendance
              .filter(x => x.batchCode === ov.batchCode && x.subjectPaperCodeId === ov.subjectPaperCodeId && j === uniqueOVs.length - 1)
              .sort((aa, bb) => aa.cycle.localeCompare(bb.cycle))
              .slice(-5)
              .map(a => a.isPresent)
              .filter((isPresent): isPresent is boolean => isPresent !== undefined),
            primaryFacultyCode: '',
            batchStartDate: '',
            // totalScheduled: (this.studentBatchAttendanceSummaryDataResponse?.subjectPaperCodeSummaryList || [])
            //   .find(x => x.batchCode === ov.batchCode)?.totalClassScheduled?.toString() || '0',
            // totalClassConducted: (this.studentBatchAttendanceSummaryDataResponse?.subjectPaperCodeSummaryList || [])
            //   .find(x => x.batchCode === ov.batchCode)?.totalClassConducted?.toString() || '0',

            totalScheduled: ov.totalClassScheduled?.toString() || '0',
            totalClassConducted: ov.totalClassConducted?.toString() || '0',
            totalPresent: ov.totalPresent,
            totalAbsent: ov.totalAbsent,
            attendancePercentage: ov.attendancePercentage,
            teacherName,
            creditUnit: ov.creditUnit
          });
        }

        this.studentBatchAttendanceSummaryRegistrationNumberWise[i].studentBatchAttendanceSummaryOperationalVerticalWise[j].studentBatchAttendanceReport
          .sort((a, b) => a.subjectPaperCodeName.localeCompare(b.subjectPaperCodeName));
      }
    }
  }

  onBatchCodeClick(batchCode: string) {
    if (batchCode) {
      this.batchService.getByBatchCode(batchCode).subscribe({
        next: data => {
          this.batch = data;
          this.isBatchCodeDetailsViewDialog = true;
        },
        error: err => {
          this.messageService.add({ severity: 'warn', summary: 'Warning', detail: `Unable to get batch details: ${err.message}`, life: 3000 });
        }
      });
    }
  }
}