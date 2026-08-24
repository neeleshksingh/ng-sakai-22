import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StudentRegisterService {

  constructor(private http: HttpClient) { }
  getStudentRegisterByPhoneNumber(phoneNumber: string) {
    return this.http.get<any>(environment.apiLeadsUrl + '/StudentRegister/GetByPhoneNumber/' + phoneNumber);
  }
}