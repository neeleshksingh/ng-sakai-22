import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Company } from 'src/app/shared/models/finance-Pro/company';
import { GenericService } from 'src/app/shared/services/generic.service';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class CompanyService extends GenericService<Company, Company> {

    constructor(http: HttpClient, messageService: MessageService) {
        super(http, messageService, "Company", environment.apiAccountsUrl);
    }
}