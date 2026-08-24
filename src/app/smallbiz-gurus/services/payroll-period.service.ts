import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { MessageService } from 'primeng/api';
import { PayrollPeriod } from 'src/app/shared/models/smallbizgurus/payroll-period';
import { GenericService } from 'src/app/shared/services/generic.service';


@Injectable({
    providedIn: 'root'
})

export class PayrollPeriodService extends GenericService<PayrollPeriod, PayrollPeriod> {
    constructor(http: HttpClient,  messageService: MessageService) {
        super(http,  messageService, "PayrollPeriod", environment.apiHumanResourcesUrl);
    }
}