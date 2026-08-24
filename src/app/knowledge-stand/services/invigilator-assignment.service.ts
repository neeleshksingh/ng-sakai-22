import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { InvigilatorAssignment } from 'src/app/shared/models/knowledge-stand/invigilator-assignment';
import { GenericService } from 'src/app/shared/services/generic.service';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InvigilatorAssignmentService extends GenericService<InvigilatorAssignment, InvigilatorAssignment> {
  constructor(http: HttpClient, messageService: MessageService) {
    super(http, messageService, "InvigilatorAssignment", environment.apiExaminationsUrl);
  }
}