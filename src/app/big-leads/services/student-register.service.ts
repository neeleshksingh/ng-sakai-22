import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { StudentRegister } from 'src/app/shared/models/bigleads/student-register';
import { GenericService } from 'src/app/shared/services/generic.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StudentRegisterService extends GenericService<StudentRegister, StudentRegister> {

  constructor(http: HttpClient, messageService: MessageService) {
    super(http, messageService, "StudentRegister", environment.apiLeadsUrl);
  }

  GetByQueryParameters(searchText: any, pageIndex: any, sortBy: any, sortDirection: any, pageSize: any) {
    return this.http.get<any>(environment.apiLeadsUrl + '/StudentRegister/GetByQueryParameters?SearchText=' + searchText + '&PageIndex=' + pageIndex + '&SortBy=' + sortBy + '&SortDirection=' + sortDirection + '&PageSize=' + pageSize);
  }

  GetByStudentRegisterSearchRequest(payload: { academicSessionIds: number[]; programIds: number[]; semesterIds: number[] }) {
    return this.http.post<any>(environment.apiLeadsUrl + '/StudentRegister/GetByStudentRegisterSearchRequest', payload);
  }

  getByStudentId(studentId: string) {
    return this.http.get<any>(environment.apiLeadsUrl + '/Student/GetByStudentId/' + studentId);
  }

  importStudentRegister(file: any) {
    return this.http.post(environment.apiLeadsUrl + '/StudentRegister/Import', file);
  }

  getStudentRegisterByAdmissionYear(admissionYear: string) {
    return this.http.get<StudentRegister[]>(environment.apiLeadsUrl + '/StudentRegister/GetByAdmissionYear/' + admissionYear);
  }
}