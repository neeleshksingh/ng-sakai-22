import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Withdraw } from 'src/app/shared/models/student-onboarding/withdraw';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WithdrawalService {

  constructor(private httpClient: HttpClient) { }

  getStudentOnBoardingWithdrawal() {
    return this.httpClient.get<Withdraw[]>(environment.apiLeadsUrl + '/StudentOnboardingWithdrawal/GetStudentOnBoardingWithdrawal');
  }
  getStudentOnBoardingWithdrawalById(id: number) {
    return this.httpClient.get<Withdraw>(environment.apiLeadsUrl + '/StudentOnboardingWithdrawal/GetStudentOnBoardingWithdrawalById/' + id);
  }
  getStudentOnBoardingWithdrawalByAdmissionNumber(admissionNumber: string) {
    return this.httpClient.get<Withdraw>(environment.apiLeadsUrl + '/StudentOnboardingWithdrawal/GetStudentOnBoardingWithdrawalByAdmissionNumber/' + admissionNumber);
  }
  saveWithdrawalRequest(formData: FormData) {
    return this.httpClient.post<Withdraw>(environment.apiLeadsUrl + '/StudentOnboardingWithdrawal/SaveStudentOnBoardingWithdrawalRequest', formData);
  }
  updateStudentOnBoardingWithdrawalById(withdraw: Withdraw) {
    return this.httpClient.post<Withdraw>(environment.apiLeadsUrl + '/StudentOnboardingWithdrawal/UpdateStudentOnBoardingWithdrawalById', withdraw);
  }
}
