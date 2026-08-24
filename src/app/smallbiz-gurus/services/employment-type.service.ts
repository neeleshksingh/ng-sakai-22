import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EmploymentType } from 'src/app/shared/models/smallbizgurus/employment-type';
import { GenericServiceNols } from 'src/app/shared/services/generic-service-nols.service';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})

export class EmploymentTypeService extends GenericServiceNols<EmploymentType, EmploymentType> {

    constructor(http: HttpClient) {
        super(http, "EmploymentType", environment.apiHumanResourcesUrl);
    }
}