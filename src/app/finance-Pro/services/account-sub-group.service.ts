import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { AccountSubGroup, AccountSubGroupResponse } from 'src/app/shared/models/finance-Pro/account-sub-group';
import { GenericService } from 'src/app/shared/services/generic.service';
import { environment } from 'src/environments/environment';


@Injectable({
    providedIn: 'root'
})

export class AccountSubGroupService extends GenericService<AccountSubGroup, AccountSubGroupResponse> {

    constructor(http: HttpClient, messageService: MessageService) {
        super(http, messageService, "AccountSubGroup", environment.apiAccountsUrl);
    }
}