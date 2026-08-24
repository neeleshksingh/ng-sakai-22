import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EmployeeDepartmentGroup } from 'src/app/shared/models/smallbizgurus/employee-department-group';
import { GenericServiceNols } from 'src/app/shared/services/generic-service-nols.service';
import { environment } from 'src/environments/environment';


@Injectable({
    providedIn: 'root'
})

export class EmployeeDepartmentGroupService extends GenericServiceNols<EmployeeDepartmentGroup, EmployeeDepartmentGroup> {
    constructor(http: HttpClient) {
        super(http, "EmployeeDepartmentGroup", environment.apiHumanResourcesUrl);
    }
}