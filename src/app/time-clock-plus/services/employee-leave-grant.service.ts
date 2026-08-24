import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { EmployeeLeaveGrant } from 'src/app/shared/models/TimeClockPlus/employee-leave-grant';
import { GenericService } from 'src/app/shared/services/generic.service';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class EmployeeLeaveGrantService extends GenericService<EmployeeLeaveGrant, EmployeeLeaveGrant> {

    constructor(http: HttpClient,  messageService: MessageService) {
      super(http,messageService, "EmployeeLeaveGrant",  environment.apiTimeClockPlusUrl);
    }
    getByLeaveYearIdEmployeeCode(leaveYearId : number, employeeCode :  string) {
        return this.http.get<EmployeeLeaveGrant[]>(environment.apiTimeClockPlusUrl + '/EmployeeLeaveGrant/GetByLeaveYear/' + leaveYearId + '/EmployeeCode/' + employeeCode)
    }
    getByLeaveYearIdMonth(leaveYearId : number, month :  string) {
        return this.http.get<EmployeeLeaveGrant[]>(environment.apiTimeClockPlusUrl + '/EmployeeLeaveGrant/GetByLeaveYear/' + leaveYearId + '/Month/' + month)
    }
}