import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OperationalVerticalSubjectConfiguration } from 'src/app/shared/models/cloudbytes/operational-vertical-subject-configuration';

import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class OperationalVerticalSubjectConfigurationService {

    constructor(private http: HttpClient) { }

    getByAcademicSession(academicSessionId: number, programId: number, operationalVerticalId: number) {
        return this.http.get<OperationalVerticalSubjectConfiguration[]>(environment.apiStudentsUrl + '/OperationalVerticalSubjectConfiguration/GetByAcademicSession/' + academicSessionId + '/Program/' + programId + '/OperationalVertical/' + operationalVerticalId)
    }
}