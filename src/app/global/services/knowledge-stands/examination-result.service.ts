import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BacklogHistory } from 'src/app/shared/models/knowledge-stand/backlog-history';
import { ExaminationResultExpandoResponse } from 'src/app/shared/models/knowledge-stand/examination-result-expando';
import { StudentFullExaminationResultResponse } from 'src/app/shared/models/knowledge-stand/student-full-examination-result-report';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExaminationResultService {

  constructor(private http: HttpClient) { }

  private studentBacklogHistory = new BehaviorSubject<BacklogHistory[]>([]);
  private studentFullExaminationResult = new BehaviorSubject<StudentFullExaminationResultResponse>(new StudentFullExaminationResultResponse);
  private studentExaminationResultExpandoByStudentId = new BehaviorSubject<ExaminationResultExpandoResponse>(new ExaminationResultExpandoResponse);

  public studentId!: string;
  public studentIdBacklogHistory!: string;

  getStudentExaminationResultExpandoByStudentId(studentId: string){
    return this.http.get<ExaminationResultExpandoResponse>(environment.apiGlobalUrl +
      '/ExaminationResult/GetStudentExaminationResultExpandoByStudentId/' + studentId);
  }
  getStudentExaminationResultExpando(){
    return this.studentExaminationResultExpandoByStudentId.asObservable();
  }
  getStudentExaminatinBacklogHistoryByStudentId(studentId: string) {
    this.http.get<BacklogHistory[]>(environment.apiGlobalUrl +
      '/ExaminationResult/GetStudentExaminatinBacklogHistoryByStudentId/' + studentId).subscribe(response => {
        this.studentBacklogHistory.next(response);
      });
  }
  getStudentFullExaminationResultExpandoByStudentId(studentId: string) {
    this.http.get<StudentFullExaminationResultResponse>(environment.apiGlobalUrl +
      '/ExaminationResult/GetByStudentId/' + studentId).subscribe(response => {
        this.studentFullExaminationResult.next(response);
      });
  }

  getStudentBacklog() {
    return this.studentBacklogHistory.asObservable();
  }
  getStudentExaminationResult() {
    return this.studentFullExaminationResult.asObservable();
  }
  getStudentExaminationResultStatusByAcademicSession(academicSessionID: string, programID: string, operationalVerticalID: string) {
    return this.http.get(environment.apiGlobalUrl + '/ExaminationResult/GetStudentExaminationResultStatusByAcademicSession/' + academicSessionID + '/Program/' + programID + '/OperationalVertical/' + operationalVerticalID)
  }

  getStudentExaminationBacklogHistoryByStudentId(studentId: string) {
    return this.http.get<BacklogHistory[]>(environment.apiGlobalUrl +
      '/ExaminationResult/GetStudentExaminationBacklogHistoryByStudentId/' + studentId);
  }
}
