import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { OperationalVerticalSubject, OperationalVerticalSubjectSearchResponse, OvSubjectSearch } from 'src/app/shared/models/cloudbytes/operational-vertical-subject';
import { GenericGlobalService } from 'src/app/shared/services/generic-service-global.service';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class OperationalVerticalSubjectService extends GenericGlobalService<OperationalVerticalSubject, OperationalVerticalSubject> {

    constructor(http: HttpClient, messageService: MessageService) {
        super(http, messageService, "OperationalVerticalSubject", environment.apiGlobalUrl);
    }

    getByAcademicSession(academicSessionId: number, programId: number, operationalVerticalId: number) {
        return this.http.get<OperationalVerticalSubject[]>(environment.apiGlobalUrl + '/OperationalVerticalSubject/GetByAcademicSession/' + academicSessionId + '/Program/' + programId + '/OperationalVertical/' + operationalVerticalId);
    }

    getOperationalVerticalSubjectSearchResponse(ovSubjectSearch: OvSubjectSearch) {
        return this.http.post<OperationalVerticalSubjectSearchResponse>(environment.apiGlobalUrl + '/OperationalVerticalSubject/GetByOperationalVerticalSubjectSearchRequest', ovSubjectSearch);
    }
}