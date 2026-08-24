import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MessageService } from 'primeng/api';
import { Observable } from "rxjs";
import { DateRange } from "src/app/shared/models/commons/date-range";
import { PaymentChallanSearchRequest } from "src/app/shared/models/finance-Pro/payment-challan-search-request";
import { PaymentChallan, PaymentChallanDateRangeRequest } from "src/app/shared/models/finance-Pro/payment-challans";
import { GenericService } from 'src/app/shared/services/generic.service';
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class PaymentChallanService extends GenericService<PaymentChallanDateRangeRequest, PaymentChallan> {

    constructor(http: HttpClient, messageService: MessageService) {
      super(http, messageService, "PaymentChallan",  environment.apiAccountsUrl);
    }

    downloadPaymentChallanByPaymentChallanSearchRequest(paymentChallanSearchRequest: PaymentChallanSearchRequest): Observable<Blob> {
        return this.http.post(environment.apiAccountsUrl + '/PaymentChallan/DownloadPaymentChallanByPaymentChallanSearchRequest', paymentChallanSearchRequest, {
            responseType: 'blob'
        });
    }
    getPaymentChallanByRegistrationNumber(registrationNumber: string) {
        return this.http.get<PaymentChallan[]>(environment.apiAccountsUrl + '/PaymentChallan/GetPaymentChallanByRegistrationNumber/' + registrationNumber);
    }
    downloadPaymentChallanByRegistrationNumber(registrationNumber: string, challanNumber: string): Observable<Blob> {
        return this.http.get(environment.apiAccountsUrl + '/PaymentChallan/DownloadPaymentChallanByRegistrationNumber/' + registrationNumber + '/ChallanNumber/' + challanNumber, {
            responseType: 'blob'
        });
    }

    getByPaymentChallanDateRangeRequest(dateRange: DateRange) {
        return this.http.post<PaymentChallanDateRangeRequest>(environment.apiAccountsUrl + '/PaymentChallan/GetByPaymentChallanDateRangeRequest', dateRange);
    }

    getPaymentChallanExpandoByRegistrationNumber(registrationNumber: String) {
        return this.http.get<PaymentChallanDateRangeRequest>(environment.apiAccountsUrl + '/PaymentChallan/GetPaymentChallanExpandoByRegistrationNumber/' + registrationNumber);
    }   
    updatePaymentChallanById(id: number, paymentChallan: PaymentChallan) {
        return this.http.post<PaymentChallanDateRangeRequest>(environment.apiAccountsUrl + '/PaymentChallan/UpdateById/' + id, paymentChallan);
    }
     deletePaymentChallanById(id: number) {
        return this.http.post(environment.apiAccountsUrl + `/PaymentChallan/DeleteByIntId/${id}` ,null );
    }
}