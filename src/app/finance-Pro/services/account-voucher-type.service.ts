import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { AccountVoucherType } from 'src/app/shared/models/finance-Pro/account-voucher-type';
import { GenericService } from 'src/app/shared/services/generic.service';
import { environment } from 'src/environments/environment';


@Injectable({
    providedIn: 'root'
})

export class AccountVoucherTypeService extends GenericService<AccountVoucherType, AccountVoucherType> {

    constructor(http: HttpClient, messageService: MessageService) {
        super(http, messageService, "AccountVoucherType", environment.apiAccountsUrl);
    }
}