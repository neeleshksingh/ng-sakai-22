import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { LeaveGrantJobStatus } from 'src/app/shared/models/TimeClockPlus/leave-grant-job-status';
import { GenericService } from 'src/app/shared/services/generic.service';
import { environment } from 'src/environments/environment';

@Injectable({
   providedIn: 'root'
})

export class LeaveGrantJobStatusService extends GenericService<LeaveGrantJobStatus, LeaveGrantJobStatus> {

    constructor(http: HttpClient, messageService: MessageService) {
      super(http,messageService, "LeaveGrantJobStatus",  environment.apiTimeClockPlusUrl);
    }
}