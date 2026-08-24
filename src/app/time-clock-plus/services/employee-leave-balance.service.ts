import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { EmployeeLeaveBalance } from 'src/app/shared/models/TimeClockPlus/employee-leave-balance';
import { GenericService } from 'src/app/shared/services/generic.service';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
  })
  export class EmployeeLeaveBalanceService extends GenericService<EmployeeLeaveBalance, EmployeeLeaveBalance> {

    constructor(http: HttpClient, messageService: MessageService) {
      super(http,messageService, "EmployeeLeaveBalance",  environment.apiTimeClockPlusUrl);
    }

    ProcessLeaveBalanceByleaveYearName(leaveYearName:string, month:number) {
        return this.http.get<any>(environment.apiTimeClockPlusUrl + '/EmployeeLeaveBalance/ProcessLeaveBalanceByleaveYearName/'+leaveYearName+'/Month/'+month);
      }
    getEmployeeLeaveBalanceByLeaveYearIdEmployeeCode(leaveYearId:number, employeeCode:string) {
        return this.http.get<EmployeeLeaveBalance[]>(environment.apiTimeClockPlusUrl + '/EmployeeLeaveBalance/GetByLeaveYearId/'+leaveYearId+'/EmployeeCode/'+ employeeCode);
    }
  }