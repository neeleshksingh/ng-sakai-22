import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { StudentStatusDescription } from 'src/app/shared/models/cloudbytes/student-status-description';
import { GenericService } from 'src/app/shared/services/generic.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StudentStatusDescriptionService extends GenericService<StudentStatusDescription, StudentStatusDescription> {

  constructor(http: HttpClient, messageService: MessageService) {
    super(http, messageService, "StudentStatusDescription", environment.apiMastersUrl);
  }
}