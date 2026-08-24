import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { BatchAttendanceService } from 'src/app/mind-spark/services/batch-attendance.service';
import { BatchService } from 'src/app/mind-spark/services/batch.service';
import { BatchResponse } from 'src/app/shared/models/mindspark/batch';
import { StudentBatchAttendance } from 'src/app/shared/models/mindspark/student-batch-attendance';
import { StudentBatchAttendanceSummaryDataResponse, StudentBatchAttendanceSummaryRegistrationNumberWise } from 'src/app/shared/models/mindspark/student-batch-attendance-report';

@Component({
  selector: 'app-batch-attendance',
  standalone: false,
  templateUrl: './batch-attendance.component.html',
  styleUrl: './batch-attendance.component.scss'
})
export class BatchAttendanceComponent implements OnInit {

  studentBatchAttendanceSummaryDataResponse!: StudentBatchAttendanceSummaryDataResponse;
  studentBatchAttendance!: StudentBatchAttendance[];
  studentBatchAttendanceSummaryRegistrationNumberWise: StudentBatchAttendanceSummaryRegistrationNumberWise[] = [];
  arrays: any = []
  batch?: BatchResponse;
  isBatchCodeDetailsViewDialog!: boolean;

  constructor(private batchAttendanceService: BatchAttendanceService,
    private batchService: BatchService,
    private messageService: MessageService,
  ) { }

  ngOnInit(): void {

    this.batchAttendanceService.studentBatchAttendanceSummaryDataResponse.subscribe(response => {
      this.studentBatchAttendanceSummaryDataResponse = response;
      this.getBatchAttendanceByStudentId();
    });
  }
  getBatchAttendanceByStudentId() {
    this.batchAttendanceService.studentBatchAttendance.subscribe(response => {
      this.studentBatchAttendance = response;
      if (this.studentBatchAttendanceSummaryDataResponse && this.studentBatchAttendance) {
        this.dataManipulationBatchAttendance();
      }
    });
  }

  dataManipulationBatchAttendance() {
    this.studentBatchAttendanceSummaryRegistrationNumberWise = [];
    let arrays = []

    // const uniqueRegistrationNumber = [...new Set(this.studentBatchAttendanceSummaryDataResponse.studentAttendanceSummaryList
    //   .map(item => item.registrationNumber))];

    const uniqueRegistrationNumber = [
      ...new Set(
        (this.studentBatchAttendanceSummaryDataResponse?.studentAttendanceSummaryList || [])
          .map(item => item.registrationNumber)
      )
    ];

    if (uniqueRegistrationNumber) {
      for (var i = 0; i < uniqueRegistrationNumber.length; i++) {
        if (this.studentBatchAttendanceSummaryDataResponse.studentAttendanceSummaryList) {

          var uniqueOVs = [...new Set(this.studentBatchAttendanceSummaryDataResponse.studentAttendanceSummaryList
            .filter(x => x.registrationNumber == uniqueRegistrationNumber[i]).map(item => item.operationalVerticalId))];

          uniqueOVs = uniqueOVs.sort((a, b) => (a ?? 0) - (b ?? 0));

          this.studentBatchAttendanceSummaryRegistrationNumberWise.push({
            programNameWithRegistrationNumber: uniqueRegistrationNumber[i] + ' - ' +
              this.studentBatchAttendanceSummaryDataResponse.programExpando
                ?.filter(x => x.id === this.studentBatchAttendanceSummaryDataResponse.studentAttendanceSummaryList?.[i]?.programId)
                .map(function (a) { return a.name }).toString(),
            registrationNumber: uniqueRegistrationNumber[0],
            studentBatchAttendanceSummaryOperationalVerticalWise: []
          })

          for (var j = 0; j < uniqueOVs.length; j++) {

            var totalPresent = (this.studentBatchAttendanceSummaryDataResponse?.studentAttendanceSummaryList || [])
              .filter(x => x.operationalVerticalId === uniqueOVs[j])
              .map(a => a.totalPresent ?? 0)
              .reduce((a, b) => a + b, 0) || 0;
            let totalPresentForCreditUnitZero = 0;
            if ((this.studentBatchAttendanceSummaryDataResponse?.subjectPaperCodeSummaryList || []).length > 0) {
              // var totalClassConducted = this.studentBatchAttendanceSummaryDataResponse?.subjectPaperCodeSummaryList
              //   .filter(x => x.operationalVerticalId == uniqueOVs[j])
              //   .map(a => a.totalClassConducted)?.reduce((a, b) => a + b, 0);
              const totalClassConducted = (this.studentBatchAttendanceSummaryDataResponse?.subjectPaperCodeSummaryList || [])
                .filter(x => x.operationalVerticalId === uniqueOVs[j])
                .map(a => a.totalClassConducted ?? 0)
                .reduce((a, b) => a + b, 0);

              var classConductedForCreditUnitZero = this.studentBatchAttendanceSummaryDataResponse?.studentAttendanceSummaryList
                .filter(x => x.operationalVerticalId == uniqueOVs[j] && x.creditUnit == 0);

              var totalClassConductedForCreditUnitZero = (this.studentBatchAttendanceSummaryDataResponse?.subjectPaperCodeSummaryList || [])
                .filter(x => x?.subjectPaperCodeId == classConductedForCreditUnitZero[0]?.subjectPaperCodeId)
                .map(a => a.totalClassConducted ?? 0)?.reduce((a, b) => a + b, 0);

              totalPresentForCreditUnitZero = (this.studentBatchAttendanceSummaryDataResponse?.studentAttendanceSummaryList || [])
                .filter(x => x.operationalVerticalId == uniqueOVs[j] && x.creditUnit == 0)
                .map(a => a.totalPresent ?? 0)?.reduce((a, b) => a + b, 0);
            }
            var totalPresentWithoutCreditUnitZero = (totalPresent - totalPresentForCreditUnitZero) * 100;

            // this.studentBatchAttendanceSummaryRegistrationNumberWise[i].studentBatchAttendanceSummaryOperationalVerticalWise.push({
            //   operationalVertical: this.studentBatchAttendanceSummaryDataResponse.operationalVerticalExpando
            //     .filter(x => x.id == uniqueOVs[j])
            //     .map(function (a) { return a.name }).toString(),
            //   studentBatchAttendanceReport: [],
            //   aggregateAttendance: this.studentBatchAttendanceSummaryDataResponse?.operationalVerticalAttendancePercentageList
            //     .filter(x => x.operationalVerticalId == uniqueOVs[j])
            //     .map(function (a) { return a.aggregateAttendancePercentage })[0],
            //   isRecentAttendanceDisplay: j == uniqueOVs.length-1,
            // });

            this.studentBatchAttendanceSummaryRegistrationNumberWise[i].studentBatchAttendanceSummaryOperationalVerticalWise.push({
              operationalVertical: (this.studentBatchAttendanceSummaryDataResponse?.operationalVerticalExpando || [])
                .filter(x => x.id === uniqueOVs[j])
                .map(a => a.name)
                .toString() || "",
              studentBatchAttendanceReport: [],
              aggregateAttendance: (this.studentBatchAttendanceSummaryDataResponse?.operationalVerticalAttendancePercentageList || [])
                .filter(x => x.operationalVerticalId === uniqueOVs[j])
                .map(a => a.aggregateAttendancePercentage)?.[0] ?? 0,

              isRecentAttendanceDisplay: j === uniqueOVs.length - 1,
            });


            const filterOvs = this.studentBatchAttendanceSummaryDataResponse.studentAttendanceSummaryList
              .filter(x => x.operationalVerticalId == uniqueOVs[j]);
            for (var k = 0; k < filterOvs.length; k++) {
              let teacherName = ''
              for (var l = 0; l < this.arrays.length; l++) {
                if (this.arrays[l].employeeCode == filterOvs[k].primaryFacultyCode) {
                  teacherName = this.arrays[l].employeeName;
                  break;
                }
              }

              this.studentBatchAttendanceSummaryRegistrationNumberWise[i].studentBatchAttendanceSummaryOperationalVerticalWise[j].studentBatchAttendanceReport.push({
                studentId: '',
                registrationNumber: '',
                academicSessionId: Number(this.studentBatchAttendanceSummaryDataResponse.academicSessionExpando.filter(x => x.id == filterOvs[k].academicSessionId).map(function (a) { return a.id })),
                academicSessionName: this.studentBatchAttendanceSummaryDataResponse.academicSessionExpando
                  .filter(x => x.id == filterOvs[k].academicSessionId).map(function (a) { return a.name }).toString(),
                programId: 0,
                programName: this.studentBatchAttendanceSummaryDataResponse.programExpando
                  .filter(x => x.id == filterOvs[k].programId).map(function (a) { return a.name }).toString(),
                operationalVerticalId: 0,
                operationalVerticalName: this.studentBatchAttendanceSummaryDataResponse.operationalVerticalExpando
                  .filter(x => x.id == filterOvs[k].operationalVerticalId).map(function (a) { return a.name }).toString(),
                operationalVerticalType: '',
                subjectPaperCodeId: Number(this.studentBatchAttendanceSummaryDataResponse.subjectPaperCodeExpando.filter(x => x.id == filterOvs[k].subjectPaperCodeId).map(function (a) { return a.id })),
                subjectPaperCodeName: this.studentBatchAttendanceSummaryDataResponse.subjectPaperCodeExpando
                  .filter(x => x.id == filterOvs[k].subjectPaperCodeId).map(function (a) { return a.name }).toString(),
                subjectId: Number(this.studentBatchAttendanceSummaryDataResponse.subjectExpando.filter(x => x.id == filterOvs[k].subjectId).map(function (a) { return a.id })),
                subjectName: this.studentBatchAttendanceSummaryDataResponse.subjectExpando
                  .filter(x => x.id == filterOvs[k].subjectId).map(function (a) { return a.name }).toString(),
                batchCode: filterOvs[k].batchCode,
                recentAttendance: this.studentBatchAttendance.filter(x => x.batchCode == filterOvs[k].batchCode &&
                  x.subjectPaperCodeId == filterOvs[k].subjectPaperCodeId && j == uniqueOVs.length - 1).sort((aa, bb) => aa.cycle.localeCompare(bb.cycle))
                  .map(function (a) { return a.isPresent })
                  .filter((isPresent): isPresent is boolean => isPresent !== undefined),
                primaryFacultyCode: '',
                batchStartDate: '',
                totalScheduled: this.studentBatchAttendanceSummaryDataResponse.subjectPaperCodeSummaryList
                  .filter(x => x.batchCode == filterOvs[k].batchCode).map(function (a) { return a.totalClassScheduled }).toString(),
                totalClassConducted: this.studentBatchAttendanceSummaryDataResponse.subjectPaperCodeSummaryList
                  .filter(x => x.batchCode == filterOvs[k].batchCode).map(function (a) { return a.totalClassConducted }).toString(),
                totalPresent: filterOvs[k].totalPresent,
                totalAbsent: filterOvs[k].totalAbsent,
                attendancePercentage: filterOvs[k].attendancePercentage,
                teacherName: teacherName,
                creditUnit: filterOvs[k].creditUnit
              });

              this.studentBatchAttendanceSummaryRegistrationNumberWise[i].studentBatchAttendanceSummaryOperationalVerticalWise[j].studentBatchAttendanceReport.sort((a, b) => a.subjectPaperCodeName.localeCompare(b.subjectPaperCodeName));
            }
          }
        }
      }
    }
  }
  onBatchCodeClick(batchCode: string) {
    if (batchCode) {
      this.batchService.getByBatchCode(batchCode).subscribe(data => {
        this.batch = data;
        this.isBatchCodeDetailsViewDialog = true;
      },
        error => {
          this.messageService.add({ severity: 'warn', summary: 'Warning', detail: "Unable to get batch details!!!" + error, life: 3000 });

        });
    }
  }
}