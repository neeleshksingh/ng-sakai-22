import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { AccountGroup, AccountGroupResponse } from 'src/app/shared/models/finance-Pro/account-group';
import { GenericService } from 'src/app/shared/services/generic.service';
import { environment } from 'src/environments/environment';


@Injectable({
    providedIn: 'root'
})

export class AccountGroupService extends GenericService<AccountGroup, AccountGroupResponse> {

    constructor(http: HttpClient, messageService: MessageService) {
        super(http, messageService, "AccountGroup", environment.apiAccountsUrl);
    }
}