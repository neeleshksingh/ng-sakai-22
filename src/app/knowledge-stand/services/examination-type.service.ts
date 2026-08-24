import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ExaminationType } from 'src/app/shared/models/knowledge-stand/examination-type';
import { GenericService } from 'src/app/shared/services/generic.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExaminationTypeService  extends GenericService<ExaminationType, ExaminationType>{

    constructor(http: HttpClient, messageService: MessageService) {
        super(http, messageService, "ExaminationType", environment.apiExaminationsUrl);
    }


}
