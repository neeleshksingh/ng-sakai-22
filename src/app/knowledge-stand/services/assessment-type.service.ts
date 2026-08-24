import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { AssessmentType } from 'src/app/shared/models/knowledge-stand/assessment-type';
import { GenericService } from 'src/app/shared/services/generic.service';
import { environment } from 'src/environments/environment';


@Injectable({
    providedIn: 'root'
})
export class AssessmentTypeService extends GenericService<AssessmentType,AssessmentType> {

    constructor(http: HttpClient, messageService: MessageService) {
        super(http, messageService, "AssessmentType", environment.apiExaminationsUrl);
    }
}