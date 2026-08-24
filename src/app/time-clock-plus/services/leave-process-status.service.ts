import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { LeaveProcessStatus } from 'src/app/shared/models/TimeClockPlus/leave-process-status';
import { GenericService } from 'src/app/shared/services/generic.service';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class LeaveProcessStatusService extends GenericService<LeaveProcessStatus, LeaveProcessStatus> {

    constructor(http: HttpClient,  messageService: MessageService) {
      super(http,messageService, "LeaveProcessStatus",  environment.apiTimeClockPlusUrl);
    }
}