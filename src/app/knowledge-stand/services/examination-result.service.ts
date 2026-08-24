import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BacklogHistory } from 'src/app/shared/models/knowledge-stand/backlog-history';
import { StudentFullExaminationResultResponse } from 'src/app/shared/models/knowledge-stand/student-full-examination-result-report';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExaminationResultService {

  constructor(private http: HttpClient) { }

  private studentBacklogHistory = new BehaviorSubject<BacklogHistory[]>([]);
  private studentFullExaminationResult = new BehaviorSubject<StudentFullExaminationResultResponse>(new StudentFullExaminationResultResponse)

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
  getStudentExaminationResultStatusByAcademicSession(academicSessionID: number, programID: number, operationalVerticalID: number) {
    return this.http.get(environment.apiExaminationsUrl + '/ExaminationResult/GetStudentExaminationResultStatusByAcademicSession/' + academicSessionID + '/Program/' + programID + '/OperationalVertical/' + operationalVerticalID)
  }

  get studentBacklog() {
    return this.studentBacklogHistory.asObservable();
  }
  get studentExaminationResult() {
    return this.studentFullExaminationResult.asObservable();
  }
}
