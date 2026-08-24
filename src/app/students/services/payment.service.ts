import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FeeReceipt } from 'src/app/shared/models/finance-Pro/fee-receipt';
import { FeeReceiptDownloadRequest } from 'src/app/shared/models/students/fee-receipt-download-request';
import { OnlinePaymentReference, OnlinePaymentReferenceRequest, OnlinePaymentReferenceResponse } from 'src/app/shared/models/students/online-payment-reference';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class PaymentService {
  
    constructor(private http: HttpClient) { }
    getOnlinePaymentReferenceByPaymentResponseId(paymentResponseId: string) {
        return this.http.get<OnlinePaymentReference>(environment.apiStudentsUrl + '/Payment/GetOnlinePaymentReferenceByPaymentResponseId/'+paymentResponseId)
    }
    saveOnlinePaymentRequest(onlinePaymentReferenceRequest: OnlinePaymentReferenceRequest) {
        return this.http.post<OnlinePaymentReferenceResponse>(environment.apiStudentsUrl + '/Payment/SaveOnlinePaymentRequest', onlinePaymentReferenceRequest)
    }
    updateOnlinePaymentReference(onlinePaymentReference: OnlinePaymentReference) {
        return this.http.post<OnlinePaymentReference>(environment.apiStudentsUrl + '/Payment/UpdateOnlinePaymentReference', onlinePaymentReference)
    }
    getFeeReceiptByStudentId(studentId: string) {
        return this.http.get<FeeReceipt[]>(environment.apiStudentsUrl + '/Payment/GetFeeReceiptByStudentId/' + studentId)
    }
    downloadFeeReceipt(feeReceiptDownloadRequest:FeeReceiptDownloadRequest): Observable <Blob> {
        return this.http.post(environment.apiStudentsUrl + '/Payment/DownloadFeeReceipt', feeReceiptDownloadRequest, {
            responseType: 'blob'
        });
    }

    downloadHtmlFeeReceipt(feeReceiptDownloadRequest: FeeReceiptDownloadRequest) {
        return this.http.post(environment.apiStudentsUrl + '/Payment/DownloadHtmlFeeReceipt', feeReceiptDownloadRequest);
    }
}