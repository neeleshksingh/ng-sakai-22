
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FeeReceipt } from 'src/app/shared/models/finance-Pro/fee-receipt';
import { ProvisionalFeeReceiptResponse } from 'src/app/shared/models/finance-Pro/provisional-fee-reciept';
import { StudentProgramProvisional } from 'src/app/shared/models/finance-Pro/student-program-provisional';
import { StudentProvisionalFee } from 'src/app/shared/models/finance-Pro/students-provisional-fee';
import { environment } from 'src/environments/environment';



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


  GetProvisionalFeeReceiptResponseByReceiptNumber(receiptNumber : string) {
    const body = {receiptNumber: receiptNumber};
    return this.http.post<ProvisionalFeeReceiptResponse>(environment.apiLeadsUrl + '/StudentOnboarding/GetProvisionalFeeReceiptResponseByReceiptNumber', body);
  }

  getFeeReceiptByProvisionalStudentIdAndReferenceNumber(provisionalStudentId: string, referenceNumber: string){
      return this.http.get<FeeReceipt>(environment.apiLeadsUrl + '/StudentOnboarding/GetFeeReceiptByProvisionalStudentId/' + provisionalStudentId + '/ReferenceNumber/' + referenceNumber);
    }
}