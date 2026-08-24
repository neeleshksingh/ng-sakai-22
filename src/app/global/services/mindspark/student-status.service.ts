import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { HttpClient } from '@angular/common/http';
import { StudentStatus } from 'src/app/shared/models/mindspark/student-status';
@Injectable({
  providedIn: 'root'
})
export class StudentStatusService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<StudentStatus[]>(environment.apiGlobalUrl + '/StudentStatus/GetAll');
  }

  getByStudentId(studentId: string) {
    return this.http.get<StudentStatus[]>(environment.apiGlobalUrl + '/StudentStatus/GetByStudentId/' + studentId);
  }

  getById(id: number) {
    return this.http.get<StudentStatus>(environment.apiGlobalUrl + '/StudentStatus/GetById/' + id);
  }

  getByAcademicSessionProgramOperationalVertical(academicSessionId: number, programId: number, operationalVerticalId: number) {
    return this.http.get<StudentStatus[]>(environment.apiGlobalUrl + '/StudentStatus/GetByAcademicSession/' + academicSessionId + '/Program/' + programId + '/OperationalVertical/' + operationalVerticalId);
  }

  getByQueryParameters(searchText: string, pageIndex: string, sortBy: string, sortDirection: string, pageSize: string) {
    return this.http.get<any>(environment.apiGlobalUrl + '/StudentStatus/GetByQueryParameters?SearchText=' + searchText + '&PageIndex=' + pageIndex + '&SortBy=' + sortBy + '&SortDirection=' + sortDirection + '&PageSize=' + pageSize);
  }
}
