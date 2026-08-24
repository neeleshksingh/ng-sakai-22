import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Examination, ExaminationResponse } from 'src/app/shared/models/knowledge-stand/examination';
import { GenericGlobalService } from 'src/app/shared/services/generic-service-global.service';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ExaminationService extends GenericGlobalService<Examination, ExaminationResponse> {

  constructor(http: HttpClient, messageService: MessageService) {
    super(http, messageService, "Examination", environment.apiGlobalUrl);
  }
}