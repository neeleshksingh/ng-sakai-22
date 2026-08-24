import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Withdraw } from 'src/app/shared/models/student-onboarding/withdraw';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WithdrawService {

  constructor(private httpClient: HttpClient) { }

  // getByDepartmentNames(depatments: string[]) {
  //     return this.http.post<DocumentCenter[]>(environment.apiGlobalUrl + '/DocumentCenter/GetByDepartmentNames', depatments);
  //   }

  //   uploadDocumentByDocumentCentreId(id: number, formData: FormData) {
  //     return this.http.post<DocumentCenter>(environment.apiExecutiveEdgeUrl + '/DocumentCenter/Upload/' + id, formData);
  //   }
  saveWithdrawalRequest(formData: FormData) {
    return this.httpClient.post<Withdraw>(environment.apiLeadsUrl + '/StudentOnboardingWithdrawal/SaveStudentOnBoardingWithdrawalRequest', formData);
  }
  getStudentOnBoardingWithdrawalByAdmissionNumber(admissionNumber: string) {
      return this.httpClient.get<Withdraw>(environment.apiLeadsUrl + '/StudentOnboardingWithdrawal/GetStudentOnBoardingWithdrawalByAdmissionNumber/' + admissionNumber);
    }
}
