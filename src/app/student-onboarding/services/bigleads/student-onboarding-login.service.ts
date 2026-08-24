import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { StudentOnboardingLogin } from '../../models/student-onboarding-login';
import { StudentOnboardingResponse } from '../../models/student-onboarding-response';

@Injectable({
  providedIn: 'root'
})
export class StudentOnboardingLoginService {

  constructor(private http: HttpClient) { }
  sendLoginOtp(studentOnBoardingLogin: StudentOnboardingLogin) {
    return this.http.post<any>(environment.apiLeadsUrl + '/StudentOnboarding/SendLoginOtp', studentOnBoardingLogin);
  }
  validateLoginOtp(studentOnBoardingLogin: StudentOnboardingLogin) {
    return this.http.post<StudentOnboardingResponse>(environment.apiLeadsUrl + '/StudentOnboarding/ValidateLoginOtp', studentOnBoardingLogin);
  }
}
