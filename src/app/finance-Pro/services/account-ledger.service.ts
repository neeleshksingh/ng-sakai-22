import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { AccountLedger } from 'src/app/shared/models/finance-Pro/account-ledger';
import { GenericService } from 'src/app/shared/services/generic.service';
import { environment } from 'src/environments/environment';


@Injectable({
    providedIn: 'root'
})

export class AccountLedgerService extends GenericService<AccountLedger, AccountLedger> {

    constructor(http: HttpClient, messageService: MessageService) {
        super(http, messageService, "AccountLedger", environment.apiAccountsUrl);
    }

    getRecentUsedAccountLedgers(top: number) {
        return this.http.get<AccountLedger[]>(`${environment.apiAccountsUrl}/AccountLedger/GetRecentUsedAccountLedgers/${top}`);
    }

    getAccountLedgersByQueryParametersByVoucherType(voucherType: string, queryParameters: any) {
        return this.http.get<AccountLedger[]>(`${environment.apiAccountsUrl}/AccountLedger/GetByQueryParameters/VoucherType/${voucherType}`, { params: queryParameters });
    }

    getAccountLedgersByQueryParametersByVoucherTypeByTransactionType(voucherTypeId: number, transactionType: number, queryParameters: any) {
        return this.http.get<AccountLedger[]>(`${environment.apiAccountsUrl}/AccountLedger/GetByQueryParameters/VoucherType/${voucherTypeId}/TransactionType/${transactionType}`, { params: queryParameters });
    }
}