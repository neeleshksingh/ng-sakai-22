import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EmployeeExit } from 'src/app/shared/models/smallbizgurus/employee-exit';
import { GenericServiceNols } from 'src/app/shared/services/generic-service-nols.service';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})

export class EmployeeExitService extends GenericServiceNols<EmployeeExit, EmployeeExit> {
    constructor(http: HttpClient) {
        super(http, "EmployeeExit", environment.apiHumanResourcesUrl);
    }
    initiateEmployeeResignation(employeeExit: EmployeeExit) {
        return this.http.post<EmployeeExit>(environment.apiHumanResourcesUrl + '/EmployeeExit/Initiate', employeeExit);
    }

    revokeResignation(employeeExit: EmployeeExit) {
        return this.http.post<EmployeeExit>(environment.apiHumanResourcesUrl + '/EmployeeExit/Revoke', employeeExit);
    }

    updateResignationStatus(employeeExit: EmployeeExit) {
        return this.http.post<EmployeeExit>(environment.apiHumanResourcesUrl + '/EmployeeExit/UpdateResignationStatus', employeeExit);
    }

    updateKnowledgeSharing(employeeExit: EmployeeExit) {
        return this.http.post<EmployeeExit>(environment.apiHumanResourcesUrl + '/EmployeeExit/UpdateKnowledgeSharing', employeeExit);
    }

    updateEmployeeExitIT(employeeExit: EmployeeExit) {
        return this.http.post<EmployeeExit>(environment.apiHumanResourcesUrl + '/EmployeeExit/UpdateEmployeeExitIT', employeeExit);
    }

    updateEmployeeExitFinance(employeeExit: EmployeeExit) {
        return this.http.post<EmployeeExit>(environment.apiHumanResourcesUrl + '/EmployeeExit/UpdateEmployeeExitFinance', employeeExit);
    }

    updateEmployeeExitHRInterview(employeeExit: EmployeeExit) {
        return this.http.post<EmployeeExit>(environment.apiHumanResourcesUrl + '/EmployeeExit/UpdateEmployeeExitHRInterview', employeeExit);
    }

    updateEmployeeExitAdministrations(employeeExit: EmployeeExit) {
        return this.http.post<EmployeeExit>(environment.apiHumanResourcesUrl + '/EmployeeExit/UpdateEmployeeExitAdministrations', employeeExit);
    }

    updateEmployeeExitPostExit(employeeExit: EmployeeExit) {
        return this.http.post<EmployeeExit>(environment.apiHumanResourcesUrl + '/EmployeeExit/UpdateEmployeeExitPostExit', employeeExit);
    }

    getEmployeeExitByEmployeeCode(employeeCode: string) {
        return this.http.get<EmployeeExit[]>(environment.apiHumanResourcesUrl + '/EmployeeExit/GetByEmployeeCode/' + employeeCode);
    }

    getEmployeeExitByUserId(userId: string) {
        return this.http.get<EmployeeExit>(environment.apiHumanResourcesUrl + '/EmployeeExit/GetByUserId/' + userId);
    }
}