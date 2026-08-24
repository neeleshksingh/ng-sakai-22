import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StudentProgramProvisional } from 'src/app/shared/models/finance-Pro/student-program-provisional';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StudentRegisterService {

  constructor(private http: HttpClient) { }
  getStudentRegisterByPhoneNumber(phoneNumber: string) {
    return this.http.get<any>(environment.apiLeadsUrl + '/StudentRegister/GetByPhoneNumber/' + phoneNumber);
  }
  getByIntId(studentRegistrationId: number){
    return this.http.get<StudentProgramProvisional>(environment.apiLeadsUrl + '/StudentRegister/GetByIntId/' + studentRegistrationId);
  }
}