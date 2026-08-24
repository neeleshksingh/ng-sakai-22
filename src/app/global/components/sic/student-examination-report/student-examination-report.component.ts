import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ExaminationResultService } from 'src/app/global/services/knowledge-stands/examination-result.service';
import { SharedModule } from '@/shared.module';
import { AcademicSession } from 'src/app/shared/models/cloudbytes/academic-session';
import { OperationalVertical } from 'src/app/shared/models/cloudbytes/operational-vertical';
import { Program } from 'src/app/shared/models/cloudbytes/program';
import { ExaminationExpando } from 'src/app/shared/models/commons/expandos';
import { EndExamRecord, ExaminationResultExpandoResponse } from 'src/app/shared/models/knowledge-stand/examination-result-expando';
import { StudentFullExaminationResultResponse } from 'src/app/shared/models/knowledge-stand/student-full-examination-result-report';
@Component({
  selector: 'app-student-examination-report',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './student-examination-report.component.html',
  styleUrl: './student-examination-report.component.scss'
})
export class StudentExaminationReportComponent {
  studentFullExaminationResultResponse!: StudentFullExaminationResultResponse;
  academicSessionExpandoStudentResult!: AcademicSession[];
  programExpandoStudentResult!: Program[];
  operationalVerticalExpandoStudentResult!: OperationalVertical[];
  examinationExpandoStudentResult!: ExaminationExpando[];
  examinationResultExpandoResponse!: ExaminationResultExpandoResponse;

  studentExaminationResultSubscription!: Subscription;
  studentExaminationResultExpandoSubscription!: Subscription;
  studentRollNumber: string = '';
  midSemester: any;
  endSemesterExams!: any[];
  totalAvailableCreditsForAllSemesters: any;
  newEGPDataList: any[] = [];
  finalGradePointAverageList: any[] = [];
  @Input() studentId: string = '';
  private previousStudentId: string = '';
  private subjectNameCache = new Map<string, string>();
  private studentDataCache = new Map<string, any>();

  gradeTooltipText: any = `
    <table style="border-collapse: collapse; font-size: 12px;">
        <thead>
            <tr>
                <th style="border: 1px solid #ddd; padding: 4px 8px; background: #850404ff;">Grade</th>
                <th style="border: 1px solid #ddd; padding: 4px 8px; background: #850404ff;">Value</th>
            </tr>
        </thead>
        <tbody>
            <tr><td style="border: 1px solid #ddd; padding: 4px 8px;">A+</td><td style="border: 1px solid #ddd; padding: 4px 8px; text-align: center;">10</td></tr>
            <tr><td style="border: 1px solid #ddd; padding: 4px 8px;">A</td><td style="border: 1px solid #ddd; padding: 4px 8px; text-align: center;">9</td></tr>
            <tr><td style="border: 1px solid #ddd; padding: 4px 8px;">B+</td><td style="border: 1px solid #ddd; padding: 4px 8px; text-align: center;">8</td></tr>
            <tr><td style="border: 1px solid #ddd; padding: 4px 8px;">B</td><td style="border: 1px solid #ddd; padding: 4px 8px; text-align: center;">7</td></tr>
            <tr><td style="border: 1px solid #ddd; padding: 4px 8px;">C+</td><td style="border: 1px solid #ddd; padding: 4px 8px; text-align: center;">6</td></tr>
            <tr><td style="border: 1px solid #ddd; padding: 4px 8px;">C</td><td style="border: 1px solid #ddd; padding: 4px 8px; text-align: center;">5</td></tr>
            <tr><td style="border: 1px solid #ddd; padding: 4px 8px;">F</td><td style="border: 1px solid #ddd; padding: 4px 8px; text-align: center;">0</td></tr>
        </tbody>
    </table>
  `;

  gradePointTooltipText: any = `
    <strong>Grade Points <br> = Grade Value × Credits</strong> <br>
    &nbsp; &nbsp; ${this.gradeTooltipText}
  `;

  constructor(
    private knowledgeStandService: ExaminationResultService,
    private messageService: MessageService,
    private route: ActivatedRoute
  ) { }

  ngOnDestroy(): void {
    this.studentExaminationResultSubscription?.unsubscribe();
    this.studentExaminationResultExpandoSubscription?.unsubscribe();
  }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      debounceTime(300),
      distinctUntilChanged((prev, curr) => prev.get('studentId') === curr.get('studentId'))
    ).subscribe(params => {
      const newStudentId = params.get('studentId') || '';
      if (newStudentId && newStudentId !== this.previousStudentId) {
        this.studentId = newStudentId;
        this.previousStudentId = newStudentId;

        // Check cache first
        const cachedData = this.studentDataCache.get(newStudentId);
        if (cachedData) {
          // Load from cache
          this.examinationResultExpandoResponse = cachedData;
          this.programExpandoStudentResult = this.examinationResultExpandoResponse?.programExpandoList;
          this.operationalVerticalExpandoStudentResult = this.examinationResultExpandoResponse?.operationalVerticalExpandoList;
          this.createExaminationResultData();
          this.calculateTotalAvailableCreditsForAllSemesters(this.examinationResultExpandoResponse.studentExaminationResultPrograms[0].studentExaminationResultOperationalVerticals);
          this.calculateNewDataEGP(this.examinationResultExpandoResponse.studentExaminationResultPrograms[0].studentExaminationResultOperationalVerticals);
        } else {
          // Fetch from API and cache it
          this.getExaminationResultData(newStudentId);
        }
      }
    });
  }

  calculateNewDataEGP(data: any) {
    // Calculate total size needed
    let totalSize = 0;
    for (const semester of data) {
      totalSize += semester.studentEndExaminations.length;
    }

    // Pre-allocate result array
    this.newEGPDataList = new Array(totalSize);
    let index = 0;

    for (const semesterResultMarkList of data) {
      const ov = semesterResultMarkList.operationalVerticalId;
      let cumulativeEGP = 0;

      for (const examination of semesterResultMarkList.studentEndExaminations) {
        // Inline calculation to avoid function call overhead
        let gradePoints = 0;
        for (const mark of examination.studentSubjectPaperCodeEndExamMarks) {
          gradePoints += mark.gradePoint * mark.credits;
        }

        cumulativeEGP += gradePoints;

        this.newEGPDataList[index++] = {
          semesterId: ov,
          examId: examination.examinationId,
          examName: examination.examinationName,
          gradePoints,
          cumulativeEGP
        };
      }
    }
  }

  private getCachedData(studentId: string): { expandoResponse: ExaminationResultExpandoResponse } | null {
    const cachedExpandoResponse = sessionStorage.getItem(`examinationResultExpando_${studentId}`);
    if (cachedExpandoResponse) {
      try {
        return {
          expandoResponse: JSON.parse(cachedExpandoResponse) as ExaminationResultExpandoResponse
        };
      } catch (e) {
        console.error('Error parsing cached examination result data:', e);
        return null;
      }
    }
    return null;
  }

  private saveCachedData(studentId: string, expandoResponse: ExaminationResultExpandoResponse) {
    try {
      sessionStorage.setItem(`examinationResultExpando_${studentId}`, JSON.stringify(expandoResponse));
    } catch (error) {
      console.error('Error saving examination result data to sessionStorage:', error);
    }
  }

  private clearSessionStorage() {
    if (this.previousStudentId) {
      sessionStorage.removeItem(`examinationResultExpando_${this.previousStudentId}`);
    }
  }

  private getExaminationResultData(studentId: string) {
    this.studentExaminationResultExpandoSubscription = this.knowledgeStandService.getStudentExaminationResultExpandoByStudentId(this.studentId).subscribe({
      next: data => {
        this.examinationResultExpandoResponse = data;
        this.studentDataCache.set(studentId, data);
        if (this.examinationResultExpandoResponse) {
          this.programExpandoStudentResult = this.examinationResultExpandoResponse?.programExpandoList;
          this.operationalVerticalExpandoStudentResult = this.examinationResultExpandoResponse?.operationalVerticalExpandoList;
          this.saveCachedData(studentId, this.examinationResultExpandoResponse);
          this.createExaminationResultData();
          this.calculateTotalAvailableCreditsForAllSemesters(this.examinationResultExpandoResponse.studentExaminationResultPrograms[0].studentExaminationResultOperationalVerticals);
          this.calculateNewDataEGP(this.examinationResultExpandoResponse.studentExaminationResultPrograms[0].studentExaminationResultOperationalVerticals);
        } else {
          this.messageService.add({ severity: 'warn', summary: 'Warning', detail: 'No examination result data received', life: 3000 });
        }
      },
      error: err => {
        console.error('Error fetching examination result data:', err);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to fetch examination result data', life: 3000 });
      }
    });
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
                    resultPublishDate: exam.resultPublishDate,
                    records,
                  });
              });
          }

          if (this.examinationResultExpandoResponse?.studentExaminationResultPrograms[i]?.studentExaminationResultOperationalVerticals[j]
            .studentEndExaminations) {
            this.examinationResultExpandoResponse?.studentExaminationResultPrograms[i]?.studentExaminationResultOperationalVerticals[j]
              .studentEndExaminations.sort((a: any, b: any) => a.examinationId - b.examinationId)
              .forEach((exam) => {
                const records = exam.studentSubjectPaperCodeEndExamMarks.map((mark) => ({
                  paperCode: mark.subjectPaperCodeName,
                  subjectName: mark.subjectName,
                  credits: mark.credits,
                  grace: mark.grace,
                  obtainedMarks: mark.obtainedMarks,
                  grade: mark.grade,
                  gradePoint: mark.gradePoint,
                  isSubmittedForScrutiny: mark.isSubmittedForScrutiny
                }));

                this.examinationResultExpandoResponse?.studentExaminationResultPrograms[i]?.studentExaminationResultOperationalVerticals[j]
                  .examinationResults?.push({
                    examinationId: exam.examinationId,
                    startDate: exam.startDate,
                    resultPublishDate: exam.resultPublishDate,
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
                  subjectName: (endRecord as EndExamRecord)?.subjectName,
                  credits: (endRecord as EndExamRecord)?.credits,
                  grade: (endRecord as EndExamRecord)?.grade,
                  gradePoint: (endRecord as EndExamRecord)?.gradePoint,
                  obtainedMarks: (endRecord as EndExamRecord)?.obtainedMarks,
                  grace: (endRecord as EndExamRecord)?.grace,
                  isSubmittedForScrutiny: (endRecord as EndExamRecord)?.isSubmittedForScrutiny,
                  examinationId: exam.examinationId,
                  startDate: exam.startDate,
                  resultPublishDate: exam.resultPublishDate,
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

  calculateTotalAvailableCreditsForAllSemesters(data: any) {
    this.totalAvailableCreditsForAllSemesters = [];
    for (let examinationResultOV of data) {
      let oV = examinationResultOV.operationalVerticalId;
      this.totalAvailableCreditsForAllSemesters.push({
        operationalVerticalId: oV,
        totalAvailableCredits: this.calculateGrandTotalCredits(examinationResultOV.studentEndExaminations[0]?.studentSubjectPaperCodeEndExamMarks ? examinationResultOV.studentEndExaminations[0].studentSubjectPaperCodeEndExamMarks : [])
      })
    }
  }

  calculateGrandTotalCredits(semesterMarks: any): string {
    let total = 0;
    for (let marks of semesterMarks) {
      total += marks.credits
    }
    return '' + total;
  }

  grandTotalCredits(operationalVertical: any): string {
    return '' + this.totalAvailableCreditsForAllSemesters.filter((mark: any) => mark.operationalVerticalId == operationalVertical).map((mark: any) => mark.totalAvailableCredits);
  }

  calculateTotalCredits(marks: any[]): string {
    if (!marks || marks.length === 0) return '-';

    const totalCredits = marks.reduce((sum, mark) => {
      const credits = Number(mark.credits || 0);
      return sum + credits;
    }, 0);

    return totalCredits.toString() || '-';
  }

  calculateEarnedCredits(marks: any[]): string {
    if (!marks || marks.length === 0) return '-';

    const earnedCredits = marks.reduce((sum, mark) => {
      // Skip credits if grade is 'F'
      if (mark.grade === 'F') {
        return sum;
      }

      const credits = Number(mark.credits || 0);
      return sum + credits;
    }, 0);

    return earnedCredits.toString() || '-';
  }

  getGradePointExamAndSemesterWise(examinationId: any, semesterId: any): string {
    const record = this.newEGPDataList.find(item =>
      item.examId === examinationId && item.semesterId === semesterId
    );
    return record ? record.gradePoints.toString() : '-';
  }

  getCumulativeGradePointsExamAndSemesterWise(examinationId: any, semesterId: any): string {
    const record = this.newEGPDataList.find(item =>
      item.examId === examinationId && item.semesterId === semesterId
    );
    return record ? record.cumulativeEGP.toString() : '-';
  }

  getExamName(examinationId?: number): string {
    if (!examinationId) return '-';
    if (this.examinationResultExpandoResponse?.examinationExpandoList) {
      const exam = this.examinationResultExpandoResponse.examinationExpandoList.find(x => x.id === examinationId);
      return exam?.name ?? '-';
    }
    return '-';
  }

  getSubjectName(paperCode: string): string {
    // Return cached value if available
    if (this.subjectNameCache.has(paperCode)) {
      return this.subjectNameCache.get(paperCode) ?? '-';
    }

    // ... existing search logic ...
    let result = '-';
    if (this.examinationResultExpandoResponse) {
      for (const program of this.examinationResultExpandoResponse.studentExaminationResultPrograms || []) {
        for (const operationalVertical of program.studentExaminationResultOperationalVerticals || []) {
          for (const exam of operationalVertical.examinationResults || []) {
            const found = (exam.records || []).find((record: any) => record.paperCode === paperCode);
            if (found && found.subjectName) {
              result = found.subjectName;
              break;
            }
          }
          if (result !== '-') break;
        }
        if (result !== '-') break;
      }
    }

    // Cache and return result
    this.subjectNameCache.set(paperCode, result);
    return result;
  }

  reloadStudentExaminationData(): void {
    if (!this.studentId) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Warning',
        detail: 'No student ID available for reload',
        life: 3000
      });
      return;
    }

    // Clear the cached data for current student
    this.clearCachedDataForStudent(this.studentId);

    // Clear the subject name cache
    this.subjectNameCache.clear();

    // Reset component state
    this.resetComponentState();

    // Fetch fresh data from API
    this.getExaminationResultData(this.studentId);

    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Student examination data reloaded successfully',
      life: 3000
    });
  }

  // Helper method to clear cached data for a specific student
  private clearCachedDataForStudent(studentId: string): void {
    try {
      sessionStorage.removeItem(`examinationResultExpando_${studentId}`);
    } catch (error) {
      console.error('Error clearing cached data:', error);
    }
  }

  // Helper method to reset component state
  private resetComponentState(): void {
    this.studentFullExaminationResultResponse = {} as StudentFullExaminationResultResponse;
    this.academicSessionExpandoStudentResult = [];
    this.programExpandoStudentResult = [];
    this.operationalVerticalExpandoStudentResult = [];
    this.examinationExpandoStudentResult = [];
    this.examinationResultExpandoResponse = {} as ExaminationResultExpandoResponse;
    this.midSemester = null;
    this.endSemesterExams = [];
  }
} 