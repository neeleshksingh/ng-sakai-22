import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { PartyDetail } from 'src/app/shared/models/finance-Pro/account-ledger';
import { GenericService } from 'src/app/shared/services/generic.service';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class PartyDetailService extends GenericService<PartyDetail, PartyDetail> {

    baseUrl: string = `${environment.apiAccountsUrl}/PartyDetail`;
    constructor(http: HttpClient, messageService: MessageService) {
        super(http, messageService, "PartyDetail", environment.apiAccountsUrl);
    }

    getPartyDetailsByAccountLedgerId(accountLedgerId: number) {
        return this.http.get<PartyDetail>(`${this.baseUrl}/GetByAccountLedgerId/${accountLedgerId}`);
    }
}