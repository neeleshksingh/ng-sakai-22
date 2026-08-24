import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { FinancialYear } from 'src/app/shared/models/finance-Pro/financial-year';
import { GenericService } from 'src/app/shared/services/generic.service';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})

export class FinancialYearService extends GenericService<FinancialYear, FinancialYear> {

    constructor(http: HttpClient, messageService: MessageService) {
        super(http, messageService, "FinancialYear", environment.apiAccountsUrl);
    }
}