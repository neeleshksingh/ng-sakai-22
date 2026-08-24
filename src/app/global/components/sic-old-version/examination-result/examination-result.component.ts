import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AcademicSession } from 'src/app/shared/models/cloudbytes/academic-session';
import { OperationalVertical } from 'src/app/shared/models/cloudbytes/operational-vertical';
import { Program } from 'src/app/shared/models/cloudbytes/program';
import { ExaminationExpando } from 'src/app/shared/models/commons/expandos';
import { EndExamRecord, ExaminationResultExpandoResponse } from 'src/app/shared/models/knowledge-stand/examination-result-expando';
import { StudentFullExaminationResultResponse } from 'src/app/shared/models/knowledge-stand/student-full-examination-result-report';
import { ExaminationResultService } from '../../../services/knowledge-stands/examination-result.service';

@Component({
  selector: 'app-examination-result',
  standalone: false,
  templateUrl: './examination-result.component.html',
  styleUrl: './examination-result.component.scss'
})
export class ExaminationResultComponent implements OnInit {
  studentFullExaminationResultResponse!: StudentFullExaminationResultResponse;
  academicSessionExpandoStudentResult!: AcademicSession[];
  programExpandoStudentResult!: Program[];
  operationalVerticalExpandoStudentResult!: OperationalVertical[];
  examinationExpandoStudentResult!: ExaminationExpando[];
  examinationResultExpandoResponse!: ExaminationResultExpandoResponse;

  studentExaminationResultSubscription!: Subscription;
  studentExaminationResultExpandoSubscription!: Subscription;

  midSemester: any;
  endSemesterExams!: any[];

  constructor(private knowledgeStandService: ExaminationResultService) { }

  ngOnDestroy(): void {
    this.studentExaminationResultSubscription?.unsubscribe();
  }

  ngOnInit(): void {
    this.studentExaminationResultExpandoSubscription = this.knowledgeStandService.getStudentExaminationResultExpando().subscribe(
      data => {
        this.examinationResultExpandoResponse = data;
        if (this.examinationResultExpandoResponse) {
          this.programExpandoStudentResult = this.examinationResultExpandoResponse?.programExpandoList;
          this.operationalVerticalExpandoStudentResult = this.examinationResultExpandoResponse?.operationalVerticalExpandoList;
          this.createExaminationResultData();

        }
      }
    )
  }
  createExaminationResultData() {
    if (this.examinationResultExpandoResponse?.studentExaminationResultPrograms.length > 0) {
      for (var i = 0; i < this.examinationResultExpandoResponse.studentExaminationResultPrograms.length; i++) {

        this.examinationResultExpandoResponse.studentExaminationResultPrograms[i].registrationNumberProgramCode =
          this.examinationResultExpandoResponse.studentExaminationResultPrograms[i].registrationNumber + ' - ' +
          this.programExpandoStudentResult.filter(x => x.id == this.examinationResultExpandoResponse.studentExaminationResultPrograms[i]
            .programId).map(function (a) { return a.programCode }).toString();

        this.midSemester = [];
        this.endSemesterExams = [];
        for (var j = 0; j < this.examinationResultExpandoResponse.studentExaminationResultPrograms[i].
          studentExaminationResultOperationalVerticals.length; j++) {

          this.examinationResultExpandoResponse.studentExaminationResultPrograms[i].studentExaminationResultOperationalVerticals[j].
            operationalVerticalName = this.operationalVerticalExpandoStudentResult.filter(x => x.id == this.examinationResultExpandoResponse.
              studentExaminationResultPrograms[i].studentExaminationResultOperationalVerticals[j].operationalVerticalId).
              map(function (a) { return a.name }).toString();

          const examinationResultsTarget = this.examinationResultExpandoResponse
            ?.studentExaminationResultPrograms[i]
            ?.studentExaminationResultOperationalVerticals[j];
          if (examinationResultsTarget) {
            if (!examinationResultsTarget.examinationResults) {
              examinationResultsTarget.examinationResults = [];
            }
          }

          if (this.examinationResultExpandoResponse?.studentExaminationResultPrograms[i]?.studentExaminationResultOperationalVerticals[j]
            .studentMidExaminations) {
            this.examinationResultExpandoResponse?.studentExaminationResultPrograms[i]?.studentExaminationResultOperationalVerticals[j]
              .studentMidExaminations.forEach((exam) => {
                const records = exam.studentSubjectPaperCodeMidExamMarks.map((mark) => ({
                  paperCode: mark.subjectPaperCodeName,
                  subjectName: mark.subjectName,
                  totalMarks: mark.totalMarks,
                  obtainedMarks: mark.obtainedMarks,
                  marksWeightage: mark.marksWeightage,
                }));
                this.examinationResultExpandoResponse?.studentExaminationResultPrograms[i]?.studentExaminationResultOperationalVerticals[j]
                  .examinationResults.push({
                    examinationId: exam.examinationId,
                    startDate: exam.startDate,
                    records,
                  });
              });
          }

          if (this.examinationResultExpandoResponse?.studentExaminationResultPrograms[i]?.studentExaminationResultOperationalVerticals[j]
            .studentEndExaminations) {
            this.examinationResultExpandoResponse?.studentExaminationResultPrograms[i]?.studentExaminationResultOperationalVerticals[j]
              .studentEndExaminations?.forEach((exam) => {
                const records = exam.studentSubjectPaperCodeEndExamMarks.map((mark) => ({
                  paperCode: mark.subjectPaperCodeName,
                  // subjectName: mark.subjectName,
                  credits: mark.credits,
                  grade: mark.grade,
                  gradePoint: mark.gradePoint,
                }));
                this.examinationResultExpandoResponse?.studentExaminationResultPrograms[i]?.studentExaminationResultOperationalVerticals[j]
                  .examinationResults?.push({
                    examinationId: exam.examinationId,
                    startDate: exam.startDate,
                    records,
                  });
              });
          }

          const allPaperCodes = new Set<string>();
          const midRecordsMap = new Map<string, any>();

          const midSemesterExaminationId = this.examinationResultExpandoResponse?.studentExaminationResultPrograms[i]?.
            studentExaminationResultOperationalVerticals[j].studentMidExaminations[0]?.examinationId;

          const operationalVertical = this.examinationResultExpandoResponse?.studentExaminationResultPrograms[i]?.
            studentExaminationResultOperationalVerticals[j];
          if (operationalVertical) {
            const foundExamination = operationalVertical.examinationResults.find((exam) => exam.examinationId === midSemesterExaminationId);
            operationalVertical.midSemester = foundExamination ? [foundExamination] : [];

            operationalVertical.endSemesterExams = operationalVertical.examinationResults.filter(
              (exam) => exam.examinationId !== midSemesterExaminationId
            ) ?? [];
          }

          this.examinationResultExpandoResponse?.studentExaminationResultPrograms[i]?.
            studentExaminationResultOperationalVerticals[j]?.midSemester[0]?.records.forEach((record: any) => {
              allPaperCodes.add(record.paperCode);
              midRecordsMap.set(record.paperCode, record);
            });
          this.examinationResultExpandoResponse?.studentExaminationResultPrograms[i]?.
            studentExaminationResultOperationalVerticals[j]?.midSemester.forEach(element => {
              element.examinationName = this.examinationResultExpandoResponse.examinationExpandoList.filter(x => x.id == element.examinationId).
                map(function (a) { return a.name }).toString();
            });

          this.examinationResultExpandoResponse?.studentExaminationResultPrograms[i]?.
            studentExaminationResultOperationalVerticals[j].endSemesterExams.forEach((exam) => {
              exam.examinationName = this.examinationResultExpandoResponse.examinationExpandoList.filter(x => x.id == exam.examinationId).
                map(function (a) { return a.name }).toString();
              exam.records.forEach((record: any) => {
                allPaperCodes.add(record.paperCode);
              });
            });

          allPaperCodes.forEach((paperCode) => {
            const midRecord = midRecordsMap.get(paperCode) || {};
            const endSemesterData = this.examinationResultExpandoResponse?.studentExaminationResultPrograms[i]?.
              studentExaminationResultOperationalVerticals[j].endSemesterExams.map((exam) => {
                const endRecord = exam.records.find((record: any) => record.paperCode === paperCode) || {};
                return {
                  // subjectName: (endRecord as EndExamRecord)?.subjectName,
                  credits: (endRecord as EndExamRecord)?.credits,
                  grade: (endRecord as EndExamRecord)?.grade,
                  gradePoint: (endRecord as EndExamRecord)?.gradePoint,
                  examinationId: exam.examinationId,
                  startDate: exam.startDate
                };
              });

            const examinationDataTarget = this.examinationResultExpandoResponse
              ?.studentExaminationResultPrograms[i]
              ?.studentExaminationResultOperationalVerticals[j];
            if (examinationDataTarget) {
              if (!examinationDataTarget.examinationData) {
                examinationDataTarget.examinationData = [];
              }
            }

            this.examinationResultExpandoResponse?.studentExaminationResultPrograms[i]?.
              studentExaminationResultOperationalVerticals[j].examinationData.push({
                paperCode,
                subjectName: midRecord.subjectName,
                totalMarks: midRecord.totalMarks,
                obtainedMarks: midRecord.obtainedMarks,
                marksWeightage: midRecord.marksWeightage,
                endSemesterData,
                midSemesterData: this.examinationResultExpandoResponse?.studentExaminationResultPrograms[i]?.
                  studentExaminationResultOperationalVerticals[j].studentMidExaminations[0]
              });
          });
        }
      }
    }
  }

  calculateTotalCredits(marks: any[]): string {
    if (!marks || marks.length === 0) return '-';

    const totalCredits = marks.reduce((sum, mark) => {
      const credits = Number(mark.credits || 0);
      return sum + credits;
    }, 0);

    return totalCredits.toString() || '-';
  }

  getExamName(examinationId?: number): string {
    if (!examinationId) return '-';

    if (this.examinationResultExpandoResponse?.examinationExpandoList) {
      const exam = this.examinationResultExpandoResponse.examinationExpandoList.find(x => x.id === examinationId);
      return exam?.name ?? '-';
    }

    return '-';
  }
}