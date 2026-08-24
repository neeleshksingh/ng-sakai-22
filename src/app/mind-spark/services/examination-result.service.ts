import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BacklogHistory } from 'src/app/shared/models/mindspark/backlog-history';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExaminationResultService {

  constructor(private http: HttpClient) { }
  GetStudentExaminationBacklogHistoryByStudentId(studentId:string) {
      return this.http.get<BacklogHistory[]>(environment.apiAcademicsUrl + '/ExaminationResult/GetStudentExaminationBacklogHistoryByStudentId/' + studentId);
  }
}