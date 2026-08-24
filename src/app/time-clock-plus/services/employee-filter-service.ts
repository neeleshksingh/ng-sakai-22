import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { EmployeeFilter } from 'src/app/shared/models/TimeClockPlus/employee-filter';
import { GenericService } from 'src/app/shared/services/generic.service';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class EmployeeFilterService extends GenericService<EmployeeFilter, EmployeeFilter> {

    constructor(http: HttpClient, messageService: MessageService) {
      super(http,messageService, "EmployeeFilter",  environment.apiTimeClockPlusUrl);
    }
}