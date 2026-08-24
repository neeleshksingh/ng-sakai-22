import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { AccountNatureType } from 'src/app/shared/models/finance-Pro/account-nature-type';
import { GenericService } from 'src/app/shared/services/generic.service';
import { environment } from 'src/environments/environment';


@Injectable({
    providedIn: 'root'
})

export class AccountNatureTypeService extends GenericService<AccountNatureType, AccountNatureType> {

    constructor(http: HttpClient, messageService: MessageService) {
        super(http, messageService, "AccountNatureType", environment.apiAccountsUrl);
    }
}