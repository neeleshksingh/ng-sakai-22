import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { MessageService } from 'primeng/api';
import { SalaryStructure } from 'src/app/shared/models/smallbizgurus/salary-structure';
import { GenericService } from 'src/app/shared/services/generic.service';


@Injectable({
    providedIn: 'root'
})
export class SalaryStructureService extends  GenericService<SalaryStructure, SalaryStructure>{

    constructor(http: HttpClient, messageService: MessageService) {
        super(http, messageService, "SalaryStructure", environment.apiHumanResourcesUrl);
    }
}