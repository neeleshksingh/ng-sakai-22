import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { AccountCategory } from 'src/app/shared/models/finance-Pro/account-category';
import { GenericService } from 'src/app/shared/services/generic.service';
import { environment } from 'src/environments/environment';


@Injectable({
    providedIn: 'root'
})

export class AccountCategoryService extends GenericService<AccountCategory, AccountCategory> {

    constructor(http: HttpClient, messageService: MessageService) {
        super(http, messageService, "AccountCategory", environment.apiAccountsUrl);
    }
}