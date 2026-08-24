import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { SubjectPaperCode } from 'src/app/shared/models/cloudbytes/subject-paper-code';
import { GenericService } from 'src/app/shared/services/generic.service';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class SubjectPaperCodeService extends GenericService<SubjectPaperCode, SubjectPaperCode> {

    constructor(http: HttpClient, messageService: MessageService) {
        super(http, messageService, "SubjectPaperCode", environment.apiMastersUrl);
    }

    getSubjectPaperCodeBySubjectId(subjectId: number) {
        return this.http.get<SubjectPaperCode[]>(environment.apiMastersUrl + '/SubjectPaperCode/GetBySubjectId/' + subjectId);
    }
}