import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { OrganisationStudentSurveyInternal, SurveyResponse } from 'src/app/shared/models/students/organisation-student-survey-internal';
import { GenericService } from 'src/app/shared/services/generic.service';
import { environment } from 'src/environments/environment';


@Injectable({
    providedIn: 'root'
})

export class OrganisationStudentSurveyInternalService extends GenericService<OrganisationStudentSurveyInternal, OrganisationStudentSurveyInternal> {

    constructor(http: HttpClient, messageService: MessageService) {
        super(http, messageService, "OrganisationStudentSurveyInternal", environment.apiStudentsUrl);
    }

    getSurvey() {
        return this.http.get<SurveyResponse>(environment.apiStudentsUrl + '/OrganisationStudentSurveyInternal/GetSurvey');
    }
}