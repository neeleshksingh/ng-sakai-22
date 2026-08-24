import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FeeReceipt } from 'src/app/shared/models/students/fee-receipt';
import { OnlinePaymentReference, OnlinePaymentReferenceRequest, OnlinePaymentReferenceResponse } from 'src/app/shared/models/students/online-payment-reference';
import { environment } from 'src/environments/environment';
import { PaymentChallanOnboarding } from '../models/payment-challan-onboarding';
import { ProvisionalFeeReceiptResponse } from '../models/provisional-fee-receipt';
import { StudentProgramProvisional } from '../models/student-program-provisional';
import { StudentProvisionalFee } from '../models/student-provisional-fee';

@Injectable({
  providedIn: 'root'
})
export class StudentProgramProvisionalService {

  constructor(private http: HttpClient) { }

  getStudentProgramProvisionalByProvisionalStudentId(provisionalStudentId: string) {
    return this.http.get<StudentProgramProvisional>(environment.apiLeadsUrl + '/StudentProgramProvisional/GetByProvisionalStudentId/' + provisionalStudentId);
  }

  getStudentProvisionalFeeDetailByPhoneNumber(phoneNumber: string, provisionalStudentId: string) {
    return this.http.get<StudentProvisionalFee[]>(environment.apiLeadsUrl + '/StudentOnboarding/GetStudentProvisionalFeeDetailByPhoneNumber/' + phoneNumber + '/provisionalStudentId/' + provisionalStudentId);
  }

  async saveOnlinePaymentRequest(onlinePaymentReferenceRequest: OnlinePaymentReferenceRequest) {
    const res = await this.http.post<OnlinePaymentReferenceResponse>(environment.apiLeadsUrl + '/StudentOnboarding/SaveOnlinePaymentRequest', onlinePaymentReferenceRequest)
      .toPromise();
    const data = res as OnlinePaymentReferenceResponse;
    return data;
  }

  async getOnlinePaymentReferenceByPaymentResponseId(paymentResponseId: string) {
    return this.http.get<OnlinePaymentReference>(environment.apiLeadsUrl + '/StudentOnboarding/GetOnlinePaymentReferenceByPaymentResponseId/' + paymentResponseId)
      .toPromise()
      .then(res => res as OnlinePaymentReference)
      .then(data => data);
  }
  GetProvisionalFeeReceiptResponseByReceiptNumber(receiptNumber : string) {
    const body = {receiptNumber: receiptNumber};
    return this.http.post<ProvisionalFeeReceiptResponse>(environment.apiLeadsUrl + '/StudentOnboarding/GetProvisionalFeeReceiptResponseByReceiptNumber', body);
  }

  getFeeReceiptByProvisionalStudentIdAndReferenceNumber(provisionalStudentId: string, referenceNumber: string){
    return this.http.get<FeeReceipt>(environment.apiLeadsUrl + '/StudentOnboarding/GetFeeReceiptByProvisionalStudentId/' + provisionalStudentId + '/ReferenceNumber/' + referenceNumber);
  }

  downloadPaymentChallanOnboardingByPaymentChallanSearchRequest(paymentChallanSearchRequest: PaymentChallanOnboarding): Observable<Blob> {
    return this.http.post<any>(environment.apiLeadsUrl + '/PaymentChallan/DownloadPaymentChallanOnboardingByPaymentChallanSearchRequest', paymentChallanSearchRequest, { responseType: 'blob' as 'json' });
  }
}