import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { AssessmentComponent } from 'src/app/shared/models/knowledge-stand/assessment-component';
import { GenericService } from 'src/app/shared/services/generic.service';
import { environment } from 'src/environments/environment';


@Injectable({
    providedIn: 'root'
})
export class AssessmentComponentService extends GenericService<AssessmentComponent, AssessmentComponent> {

    constructor(http: HttpClient, messageService: MessageService) {
        super(http, messageService, "AssessmentComponent", environment.apiExaminationsUrl);
    }
}