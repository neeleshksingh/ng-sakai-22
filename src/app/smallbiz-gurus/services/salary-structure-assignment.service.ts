import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SalaryStructureAssignment, SalaryStructureAssignmentResponse } from 'src/app/shared/models/smallbizgurus/salary-structure-assignment';
import { GenericServiceNols } from 'src/app/shared/services/generic-service-nols.service';
import { environment } from 'src/environments/environment';


@Injectable({
    providedIn: 'root'
})
export class SalaryStructureAssignmentService extends GenericServiceNols<SalaryStructureAssignment, SalaryStructureAssignmentResponse> {

    constructor(http: HttpClient) {
        super(http, "SalaryStructureAssignment", environment.apiHumanResourcesUrl);
    }
}