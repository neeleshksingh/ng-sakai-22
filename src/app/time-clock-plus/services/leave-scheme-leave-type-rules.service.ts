import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { LeaveSchemeLeaveTypeRule } from 'src/app/shared/models/TimeClockPlus/leave-scheme-leave-type-rules';
import { GenericService } from 'src/app/shared/services/generic.service';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class LeaveSchemeLeaveTypeRuleService extends GenericService<LeaveSchemeLeaveTypeRule, LeaveSchemeLeaveTypeRule> {

    constructor(http: HttpClient, messageService: MessageService) {
      super(http,messageService, "LeaveSchemeLeaveTypeRule",  environment.apiTimeClockPlusUrl);
    }

    getLeaveSchemeLeaveTypeRule(leaveYearId: number) {
        return this.http.get<any>(environment.apiTimeClockPlusUrl + '/LeaveSchemeLeaveTypeRule/GetByLeaveYear/' + leaveYearId);
    }

    getLeaveSchemeLeaveTypeRuleByLeaveYearLeaveSchemeLeavePolicy(leaveYearId : number, leaveSchemeId : number, leavePolicyId : number){
        return this.http.get<LeaveSchemeLeaveTypeRule[]>(environment.apiTimeClockPlusUrl + `/LeaveSchemeLeaveTypeRule/GetByLeaveYear/${leaveYearId}/LeaveScheme/${leaveSchemeId}/LeavePolicy/${leavePolicyId}`)
    }
}