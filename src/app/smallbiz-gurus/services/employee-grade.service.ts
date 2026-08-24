import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { EmployeeGrade } from 'src/app/shared/models/smallbizgurus/employee-grade';
import { GenericService } from 'src/app/shared/services/generic.service';
import { environment } from 'src/environments/environment';


@Injectable({
    providedIn: 'root'
})
export class EmployeeGradeService extends  GenericService<EmployeeGrade, EmployeeGrade>{
    constructor(http: HttpClient, messageService: MessageService) {
        super(http, messageService, "EmployeeGrade", environment.apiHumanResourcesUrl);
    }
}