import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { LeavePolicy } from 'src/app/shared/models/TimeClockPlus/leave-policy';
import { GenericService } from 'src/app/shared/services/generic.service';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class LeavePolicyService extends GenericService<LeavePolicy, LeavePolicy> {

    constructor(http: HttpClient, messageService: MessageService) {
      super(http,messageService, "LeavePolicy",  environment.apiTimeClockPlusUrl);
    }

}