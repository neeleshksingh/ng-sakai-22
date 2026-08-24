import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { BankDetail } from 'src/app/shared/models/finance-Pro/bank-detail';
import { GenericService } from 'src/app/shared/services/generic.service';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class BankDetailService extends GenericService<BankDetail, BankDetail> {
    baseUrl: string = `${environment.apiAccountsUrl}/BankDetail`;
    constructor(http: HttpClient, messageService: MessageService) {
        super(http, messageService, "BankDetail", environment.apiAccountsUrl);
    }

    getBankDetailsByAccountLedgerId(accountLedgerId: number) {
        return this.http.get<BankDetail>(`${this.baseUrl}/GetByAccountLedgerId/${accountLedgerId}`);
    }
}