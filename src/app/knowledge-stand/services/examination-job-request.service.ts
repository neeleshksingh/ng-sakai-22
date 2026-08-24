import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ExaminationTRJobRequest } from 'src/app/shared/models/knowledge-stand/examination-tr-job-request';
import { GenericService } from 'src/app/shared/services/generic.service';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ExaminationTRJobRequestService extends GenericService<ExaminationTRJobRequest, ExaminationTRJobRequest> {

  constructor(http: HttpClient, messageService: MessageService) {
    super(http, messageService, "ExaminationJobRequest", environment.apiExaminationsUrl);
  }

}