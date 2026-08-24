import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { EmployeeLeaveRequest } from 'src/app/shared/models/TimeClockPlus/employee-leave-request';
import { GenericService } from 'src/app/shared/services/generic.service';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
  })
  export class EmployeeLeaveRequestService extends GenericService<EmployeeLeaveRequest, EmployeeLeaveRequest> {

    constructor(http: HttpClient, messageService: MessageService) {
      super(http,messageService, "EmployeeLeaveRequest",  environment.apiTimeClockPlusUrl);
    }

    updateEmployeeLeaveRequestStatus(payload: EmployeeLeaveRequest) {
        return this.http.post<EmployeeLeaveRequest>(environment.apiTimeClockPlusUrl + '/EmployeeLeaveRequest/UpdateEmployeeLeaveRequestStatus', payload)
    }
    getByReportToEmployeeCode(employeeCode:string,isActive:boolean) {
        return this.http.get<any>(environment.apiTimeClockPlusUrl + '/EmployeeLeaveRequest/GetByReportToEmployeeCode/'+employeeCode+'/IsActive/'+isActive);
    }
    getWorkAssignmentByEmployeeCode(employeeCode: string) {
        return this.http.get<any>(environment.apiTimeClockPlusUrl + '/EmployeeLeaveRequest/GetWorkAssignmentbyEmployeeCode/' + employeeCode);
    }
    updateWorkAssignment(payload: any) {
        return this.http.post<any>(environment.apiTimeClockPlusUrl + '/EmployeeLeaveRequest/UpdateWorkAssignment', payload);
    }
    
    getByWorkAssignedEmployeeCode(employeeCode: string) {
        return this.http.get<EmployeeLeaveRequest[]>(environment.apiTimeClockPlusUrl + '/EmployeeLeaveRequest/GetByWorkAssignedEmployeeCode/' + employeeCode);
    }
    
    updateLeaveRequestTeachingWorkAssignment(payload: any[]) {
        return this.http.post<any>(environment.apiTimeClockPlusUrl + '/EmployeeLeaveRequest/UpdateLeaveRequestTeachingWorkAssignment', payload);
    }
    
    updateLeaveRequestNonTeachingWorkAssignment(payload: any[]) {
        return this.http.post<any>(environment.apiTimeClockPlusUrl + '/EmployeeLeaveRequest/UpdateLeaveRequestNonTeachingWorkAssignment', payload);
    }
    //EmployeeLeaveRequest/GetByApproverEmployeeCode

    GetByApproverEmployeeCode(employeeCode: string) {
        return this.http.get<EmployeeLeaveRequest[]>(environment.apiTimeClockPlusUrl + '/EmployeeLeaveRequest/GetByApproverEmployeeCode/' + employeeCode);
    }
}