import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Ledger } from 'src/app/shared/models/finance-Pro/ledger';
import { GenericService } from 'src/app/shared/services/generic.service';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class LedgerService extends GenericService<Ledger, Ledger> {

    constructor(http: HttpClient, messageService: MessageService) {
        super(http, messageService, "Ledger", environment.apiAccountsUrl);
    }
}