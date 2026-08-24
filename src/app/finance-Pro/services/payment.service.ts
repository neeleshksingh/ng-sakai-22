import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FeeReceiptRequest, FeeReceiptResponse } from 'src/app/shared/models/finance-Pro/fee-receipt';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class PaymentService {

    constructor(private http: HttpClient) { }
    feeReceiptRequest(feeReceiptRequest:FeeReceiptRequest) {
        return this.http.post<FeeReceiptResponse>(environment.apiAccountsUrl + '/Payment/FeeReceiptRequest',feeReceiptRequest)   
      }

    getFeeReceiptCancellationDetailsByDateRange(payload:any) {
        return this.http.post<any>(environment.apiAccountsUrl + '/Payment/GetFeeReceiptCancellationDetailsByDateRange', payload);
    }
    feeReceiptRequests(feeReceiptRequest:FeeReceiptRequest) {
        return this.http.post<any>(environment.apiLeadsUrl + '/StudentOnboarding/FeeReceiptRequest',feeReceiptRequest)   
      }
}