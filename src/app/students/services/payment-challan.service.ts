import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { PaymentChallan } from "src/app/shared/models/finance-Pro/payment-challans";
import { PaymentChallanSearchRequest } from "src/app/shared/models/students/payment-challan-search-request";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class PaymentChallanService
{
    constructor(private http:HttpClient){}
 
    downloadPaymentChallanByPaymentChallanSearchRequest(paymentChallanSearchRequest: PaymentChallanSearchRequest): Observable <Blob> {
        return this.http.post(environment.apiStudentsUrl + '/PaymentChallan/DownloadPaymentChallanByPaymentChallanSearchRequest', paymentChallanSearchRequest, {
            responseType: 'blob'
        });
    }
    
    getPaymentChallanByRegistrationNumber​(registrationNumber: string) {
        return this.http.get<PaymentChallan[]>(environment.apiStudentsUrl + '/PaymentChallan/GetPaymentChallanByRegistrationNumber/'+registrationNumber);
    }

    downloadPaymentChallanByRegistrationNumber(registrationNumber:string,challanNumber:string): Observable <Blob> {
        return this.http.get(environment.apiStudentsUrl + '/PaymentChallan/DownloadPaymentChallanByRegistrationNumber/'+registrationNumber+'/ChallanNumber/'+challanNumber, {
            responseType: 'blob'
        });
    }
}