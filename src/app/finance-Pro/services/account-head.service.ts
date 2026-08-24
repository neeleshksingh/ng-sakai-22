import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { AccountHead, AccountHeadResponse } from 'src/app/shared/models/finance-Pro/account-head';
import { GenericService } from 'src/app/shared/services/generic.service';
import { environment } from 'src/environments/environment';


@Injectable({
    providedIn: 'root'
})

export class AccountHeadService extends GenericService<AccountHead, AccountHeadResponse> {

    constructor(http: HttpClient, messageService: MessageService) {
        super(http, messageService, "AccountHead", environment.apiAccountsUrl);
    }
}