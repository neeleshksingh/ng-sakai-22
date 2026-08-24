import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { SubjectPaperCode } from 'src/app/shared/models/cloudbytes/subject-paper-code';
import { ProgramOvsSubjectsPaperCodes } from 'src/app/shared/models/mindspark/batch-form-binding-data';
import { GenericGlobalService } from 'src/app/shared/services/generic-service-global.service';
import { environment } from 'src/environments/environment';


@Injectable({
    providedIn: 'root'
})
export class SubjectPaperCodeService extends GenericGlobalService<SubjectPaperCode, SubjectPaperCode> {

    constructor(http: HttpClient, messageService: MessageService) {
        super(http, messageService, "SubjectPaperCode", environment.apiGlobalUrl);
    }
    
    getSubjectPaperCodeBySubjectId(subjectId:number) {
        return this.http.get<SubjectPaperCode[]>(environment.apiGlobalUrl + '/SubjectPaperCode/GetBySubjectId/'+subjectId)
            .toPromise()
            .then(res => res as SubjectPaperCode[])
            .then(data => data);
    }
    getProgramOperationalVerticalSubjectPaperCodeByAcademicSessionId(academicSessionId:number) {
        return this.http.get<ProgramOvsSubjectsPaperCodes>(environment.apiGlobalUrl + '/SubjectPaperCode/GetProgramOperationalVerticalSubjectPaperCodeByAcademicSessionId/'+academicSessionId)
            .toPromise()
            .then(res => res as ProgramOvsSubjectsPaperCodes)
            .then(data => data);
    }
}