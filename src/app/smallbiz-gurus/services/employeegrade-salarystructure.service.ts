import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EmployeeGradeSalaryStructure, EmployeeGradeSalaryStructureResponse } from 'src/app/shared/models/smallbizgurus/employee-grade-salary-structure';
import { GenericServiceNols } from 'src/app/shared/services/generic-service-nols.service';
import { environment } from 'src/environments/environment';


@Injectable({
    providedIn: 'root'
})
export class EmployeeGradeSalaryStructureService extends GenericServiceNols<EmployeeGradeSalaryStructure, EmployeeGradeSalaryStructureResponse> {

    constructor(http: HttpClient) {
        super(http, "EmployeeGradeSalaryStructure", environment.apiHumanResourcesUrl);
    }
}