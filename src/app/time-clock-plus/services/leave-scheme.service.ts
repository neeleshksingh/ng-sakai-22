import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { LeaveScheme } from 'src/app/shared/models/TimeClockPlus/leave-scheme';
import { GenericService } from 'src/app/shared/services/generic.service';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class LeaveSchemeService extends GenericService<LeaveScheme, LeaveScheme> {

    constructor(http: HttpClient,  messageService: MessageService) {
      super(http,messageService, "LeaveScheme",  environment.apiTimeClockPlusUrl);
    }
}

