import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StudentStatus } from 'src/app/shared/models/mindspark/student-status';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StudentStatusService {

  constructor(private http: HttpClient) { }

  getByStudentId(studentStatusID: string) {
    return this.http.get<StudentStatus[]>(environment.apiStudentsUrl + '/StudentStatus/GetByStudentId/' + studentStatusID);
  }
}