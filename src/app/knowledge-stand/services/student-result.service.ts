import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StudentFullExaminationResultResponse } from 'src/app/shared/models/knowledge-stand/student-full-examination-result-report';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StudentResultService {

  constructor(private http: HttpClient) { }

  getStudentFullExaminationResultExpandoByStudentId(studentId: string) {
    return this.http.get<StudentFullExaminationResultResponse>(environment.apiExaminationsUrl + '/ExaminationResult/GetByStudentId/' + studentId);
  }
}
