import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { PaperTypeAssessmentConfiguration } from 'src/app/shared/models/knowledge-stand/paper-type-assessment-configuration';
import { GenericService } from 'src/app/shared/services/generic.service';

import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class PaperTypeAssessmentConfigurationService extends GenericService<PaperTypeAssessmentConfiguration,PaperTypeAssessmentConfiguration> {

    constructor(http: HttpClient, messageService: MessageService) {
        super(http, messageService, "PaperTypeAssessmentConfiguration", environment.apiExaminationsUrl);
    }

    getByAcademicSessionId(academicSessionId: PaperTypeAssessmentConfiguration) {
        return this.http.get<PaperTypeAssessmentConfiguration[]>(environment.apiExaminationsUrl + '/PaperTypeAssessmentConfiguration/GetByAcademicSessionId/' + academicSessionId);
    }
    getByAcademicSession(academicSessionId: number, paperTypeId: number) {
        return this.http.get<PaperTypeAssessmentConfiguration[]>(environment.apiExaminationsUrl + '/PaperTypeAssessmentConfiguration/GetByAcademicSession/' + academicSessionId + '/PaperType/' + paperTypeId);
    }
    
    getByAcademicSessionIdProgramIdOperationalVerticalId(examinationId: number, academicSessionId: number, programId: number, operationalVerticalId: number) {
        return this.http.get<PaperTypeAssessmentConfiguration[]>(environment.apiExaminationsUrl + '/PaperTypeAssessmentConfiguration/GetByExamination/' + examinationId + '/AcademicSession/' + academicSessionId + '/Program/' + programId + '/OperationalVertical/' + operationalVerticalId);
    }

    GetByQueryParameters(searchText: string, pageIndex: string, sortBy: string, sortDirection: string, pageSize: string) {
        return this.http.get<any>(environment.apiExaminationsUrl + '/PaperTypeAssessmentConfiguration/GetByQueryParameters?SearchText=' + searchText + '&PageIndex=' + pageIndex + '&SortBy=' + sortBy + '&SortDirection=' + sortDirection + '&PageSize=' + pageSize);
    }
}