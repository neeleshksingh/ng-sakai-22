import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { LeaveType } from 'src/app/shared/models/TimeClockPlus/leave-type';
import { GenericService } from 'src/app/shared/services/generic.service';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class LeaveTypeService extends GenericService<LeaveType, LeaveType> {

    constructor(http: HttpClient, messageService: MessageService) {
      super(http,messageService, "LeaveType",  environment.apiTimeClockPlusUrl);
    }
}   