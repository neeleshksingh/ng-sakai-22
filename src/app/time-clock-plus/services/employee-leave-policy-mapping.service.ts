import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { EmployeeLeavePolicyMapping } from 'src/app/shared/models/TimeClockPlus/employee-leave-policy-mapping';
import { GenericService } from 'src/app/shared/services/generic.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeLeavePolicyMappingService extends GenericService<EmployeeLeavePolicyMapping, EmployeeLeavePolicyMapping> {

  constructor(http: HttpClient, messageService: MessageService) {
    super(http,messageService, "EmployeeLeavePolicyMapping",  environment.apiTimeClockPlusUrl);
  }
  
  getEmployeeLeavePolicyMapping(employeeCode: string) {
    return this.http.get<any>(environment.apiTimeClockPlusUrl + '/EmployeeLeavePolicyMapping/GetByEmployeeCode/' + employeeCode);
  }

  getEmployeeLeavePolicyMappingByLeaveYearIdEmployeeFilterId(leaveYearId: number, employeeFilterId: number) {
    return this.http.get<any>(environment.apiTimeClockPlusUrl + '/EmployeeLeavePolicyMapping/GetByLeaveYear/' + leaveYearId + '/EmployeeFilter/' + employeeFilterId);
  }

  getEmployeeJoiningDetailByEmployeeFilterId(employeeFilterId: number) {
    return this.http.get<any>(environment.apiTimeClockPlusUrl + '/EmployeeJoiningDetail/GetEmployeeJoiningDetailByEmployeeFilter/' + employeeFilterId);
  }

  getLeaveSchemeLeaveTypeRuleByLeaveYearId(leaveYearId: number) {
    return this.http.get<any>(environment.apiTimeClockPlusUrl + '/LeaveSchemeLeaveTypeRule/GetByLeaveYear/' + leaveYearId);
  }
}