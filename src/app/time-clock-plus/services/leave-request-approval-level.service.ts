import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { LeaveRequestApprovalLevel } from 'src/app/shared/models/TimeClockPlus/leave-request-approval-level';
import { GenericService } from 'src/app/shared/services/generic.service';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class LeaveRequestApprovalLevelService extends GenericService<LeaveRequestApprovalLevel, LeaveRequestApprovalLevel> {

    constructor(http: HttpClient, messageService: MessageService) {
      super(http,messageService, "LeaveRequestApprovalLevel",  environment.apiTimeClockPlusUrl);
    }

    getByDepartmentId(departmentId: number) {
        return this.http.get<LeaveRequestApprovalLevel[]>(`${environment.apiTimeClockPlusUrl}/LeaveRequestApprovalLevel/GetByDepartmentId/${departmentId}`);
    }
}