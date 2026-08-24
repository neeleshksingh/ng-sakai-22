import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { StudentStatusDescription } from 'src/app/shared/models/cloudbytes/student-status-description';
import { GenericGlobalService } from 'src/app/shared/services/generic-service-global.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StudentStatusDescriptionService extends GenericGlobalService<StudentStatusDescription, StudentStatusDescription> {

  constructor(http: HttpClient, messageService: MessageService) {
    super(http, messageService, 'StudentStatusDescription', environment.apiGlobalUrl);
  }
}
