import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { GenericService } from 'src/app/shared/services/generic.service';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
  })
  export class EmployeeLeaveRequestAdavanceSettingService extends GenericService<any, any> {

    constructor(http: HttpClient,  messageService: MessageService) {
      super(http,messageService, "EmployeeLeaveRequestAdvancedSetting",  environment.apiTimeClockPlusUrl);
    }
}