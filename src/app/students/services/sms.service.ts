import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserOTPDetails } from 'src/app/shared/models/students/student';
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class SMSService {
  userOTPValidate: UserOTPDetails = {};

  constructor(private http: HttpClient) { }

  sendOTP(userOTPRequest: UserOTPDetails) {
    return this.http.post<UserOTPDetails>(environment.apiStudentsUrl + '/SMS/SendOTP', userOTPRequest);
  }
}
