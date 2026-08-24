import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EmployeeDesignation } from 'src/app/shared/models/smallbizgurus/employee-designation';
import { GenericServiceNols } from 'src/app/shared/services/generic-service-nols.service';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})

export class EmployeeDesignationService extends GenericServiceNols<EmployeeDesignation, EmployeeDesignation> {

    constructor(http: HttpClient) {
        super(http, "Designation", environment.apiHumanResourcesUrl);
    }
}