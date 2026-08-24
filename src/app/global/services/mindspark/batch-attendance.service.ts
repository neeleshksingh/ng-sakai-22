import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { StudentBatchAttendanceSummaryDataResponse as StudentBatchAttendanceSummary } from 'src/app/shared/models/knowledge-stand/student-batch-attendance-report';
import { BatchAttendance, BatchAttendanceData } from 'src/app/shared/models/mindspark/batch-attendance';
import { BatchAttendancePending } from 'src/app/shared/models/mindspark/batch-attendance-pending';
import { BatchAttendancePercentage } from 'src/app/shared/models/mindspark/batch-attendance-percentage';
import { BatchAttendanceToUdateData } from 'src/app/shared/models/mindspark/batch-attendance-to-update';
import { StudentBatchAttendance } from 'src/app/shared/models/mindspark/student-batch-attendance';
import { StudentBatchAttendanceSummaryDataResponse } from 'src/app/shared/models/mindspark/student-batch-attendance-report';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BatchAttendanceService{

  constructor(private http: HttpClient) { }

    private studentBatchAttendanceSummarySubject = new BehaviorSubject<StudentBatchAttendanceSummaryDataResponse | null>(null);
  private studentBatchAttendanceSubject = new BehaviorSubject<StudentBatchAttendance[]>([]);
  public studentId!: string;

  getStudentBatchAttendanceSummaryDataExpandoByStudentId(studentId: string) {
      this.http.get<StudentBatchAttendanceSummaryDataResponse>(environment.apiGlobalUrl
          + '/BatchAttendance/GetStudentBatchAttendanceSummaryDataExpandoByStudentId/' + studentId).subscribe(response => {
              this.studentBatchAttendanceSummarySubject.next(response);
          });
  }
  get studentBatchAttendanceSummaryDataResponse() {
      return this.studentBatchAttendanceSummarySubject.asObservable();
  }

  getBatchAttendanceByStudentId(studentId: string, last: number) {
      this.http.get<StudentBatchAttendance[]>(environment.apiGlobalUrl
          + '/BatchAttendance/GetBatchAttendanceByStudentId/' + studentId + '/Last/' + last).subscribe(response => {
              this.studentBatchAttendanceSubject.next(response);
          });
  }
  get studentBatchAttendance() {
      return this.studentBatchAttendanceSubject.asObservable();
  }


  getPendingAttendanceByBatchCode(batchCode: string) {
      return this.http.get<BatchAttendanceData>(environment.apiGlobalUrl + '/BatchAttendance/GetPendingAttendanceByBatchCode/' + batchCode)
          .toPromise()
          .then(res => res as BatchAttendanceData)
          .then(data => data);
  }

  getBatchAttendanceList() {
      return this.http.get<BatchAttendance[]>(environment.apiGlobalUrl + '/BatchAttendance/GetAll')
          .toPromise()
          .then(res => res as BatchAttendance[])
          .then(data => data);
  }

  getBatchAttendancePendingList() {
      return this.http.get<BatchAttendancePending[]>(environment.apiGlobalUrl + '/BatchAttendance/GetBatchAttendancePending');
  }

  getBatchAttendanceById(batchAttendanceId: number) {
      return this.http.get<BatchAttendance>(environment.apiGlobalUrl + '/BatchAttendance/GetByIntId/' + batchAttendanceId)
          .toPromise()
          .then(res => res as BatchAttendance)
          .then(data => data);
  }
  getByBatchAttendanceCode(batchAttendanceCode: string) {
      return this.http.get<BatchAttendance>(environment.apiGlobalUrl + '/BatchAttendance/GetByBatchAttendanceCode/' + batchAttendanceCode)
          .toPromise()
          .then(res => res as BatchAttendance)
          .then(data => data);
  }
  getBatchAttendanceByTerm(batchAttendanceTerm: string) {
      return this.http.get<BatchAttendance[]>(environment.apiGlobalUrl + '/BatchAttendance/GetByTerms/' + batchAttendanceTerm)
          .toPromise()
          .then(res => res as BatchAttendance[])
          .then(data => data);
  }
  saveBatchAttendance(batchAttendance: BatchAttendance) {

      return this.http.post<BatchAttendance>(environment.apiGlobalUrl + '/BatchAttendance/Add', batchAttendance)
          .toPromise()
          .then(res => res as BatchAttendance)
          .then(data => data);
  }
  saveBatchAttendanceMultiple(batchAttendance: BatchAttendance[]) {

      return this.http.post<BatchAttendance[]>(environment.apiExaminationsUrl + '/BatchAttendance/AddMultiple', batchAttendance)
          .toPromise()
          .then(res => res as BatchAttendance[])
          .then(data => data);
  }

  SendMessageBatchAttendanceUpdateStatusByBatchCodeCycle(batchCode: string, cycle: string) {
      return this.http.get(environment.apiGlobalUrl + '/BatchAttendance/SendMessageBatchAttendanceUpdateStatusByBatchCodeCycle/' + batchCode + '/Cycle/' + cycle);
  }

  updateBatchAttendance(batchAttendance: BatchAttendance) {

      return this.http.put<BatchAttendance>(environment.apiExaminationsUrl + '/BatchAttendance/UpdateById',
          batchAttendance)
          .toPromise()
          .then(res => res as BatchAttendance)
          .then(data => data);
  }
  deleteBatchAttendance(batchAttendanceId: number) {
      return this.http.post<BatchAttendance>(environment.apiExaminationsUrl + `/BatchAttendance/DeleteByIntId/${batchAttendanceId}` ,null)
          .toPromise()
          .then(res => res as BatchAttendance)
          .then(data => data);;

  }
  getBatchAttendanceByBatchCode(batchCode: string, cycle: string) {
      return this.http.get<BatchAttendanceToUdateData>(environment.apiGlobalUrl + '/BatchAttendance/GetBatchAttendanceByBatchCode/' + batchCode + '/Cycle/' + cycle);
  }

  getBatchAttendancePendingBySearchRequest(request: any) {
      return this.http.get<BatchAttendanceToUdateData>(environment.apiGlobalUrl + '/BatchAttendance/GetBatchAttendanceBy');
  }

  getBatchAttendancePercentageByAcademicSession(academicSessionId: number, programId: number, operationalVerticalId: number) {
      return this.http.get<BatchAttendancePercentage[]>(environment.apiGlobalUrl + '/BatchAttendance/GetBatchAttendancePercentageByAcademicSession/' + academicSessionId + '/Program/' + programId + '/OperationalVertical/' + operationalVerticalId);
  }

  getBatchAttendancePivotByAcademicSession(academicSessionId: number, programId: number, operationalVerticalId: number) {
      return this.http.get<any>(environment.apiGlobalUrl + '/BatchAttendance/GetBatchAttendancePivotByAcademicSession/' + academicSessionId + '/Program/' + programId + '/OperationalVertical/' + operationalVerticalId);
  }

  getBatchAttendancePercentageByBatchCode(batchCode: string) {
      return this.http.get<BatchAttendancePercentage[]>(environment.apiGlobalUrl + '/BatchAttendance/GetBatchAttendancePercentageByBatchCode/' + batchCode);
  }
  getBatchAttendancePercentageByRegistrationNumber(registrationNumber: string) {
      return this.http.get<BatchAttendancePercentage[]>(environment.apiGlobalUrl + '/BatchAttendance/GetBatchAttendancePercentageByRegistrationNumber/' + registrationNumber);
  }

  getBatchAttendancePendingBy(request: any) {
      return this.http.get<BatchAttendanceToUdateData>(environment.apiGlobalUrl + '/BatchAttendance/GetBatchAttendanceBy');
  }

  GetStudentBatchAttendanceSummaryDataExpandoByStudentId(studentId: string) {
      return this.http.get<StudentBatchAttendanceSummary>(environment.apiGlobalUrl
          + '/BatchAttendance/GetStudentBatchAttendanceSummaryDataExpandoByStudentId/' + studentId);
  }

  GetBatchAttendanceByStudentId(studentId: string, last: number) {
      return this.http.get<StudentBatchAttendance[]>(environment.apiGlobalUrl
          + '/BatchAttendance/GetBatchAttendanceByStudentId/' + studentId + '/Last/' + last);
  }

  getBatchAttendanceByRegistrationNumber(registrationNumber : string){
        return this.http.get<BatchAttendance[]>(`${environment.apiGlobalUrl}/BatchAttendance/GetByRegistrationNumber/${registrationNumber}`);
    }
}