import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { LeavePeriodicity } from 'src/app/shared/models/TimeClockPlus/leave-periodicity';
import { GenericService } from 'src/app/shared/services/generic.service';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class LeavePeriodicityService extends GenericService<LeavePeriodicity, LeavePeriodicity> {

    constructor(http: HttpClient, messageService: MessageService) {
      super(http,messageService, "LeavePeriodicity",  environment.apiTimeClockPlusUrl);
    }

}