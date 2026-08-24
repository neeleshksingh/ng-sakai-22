import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { SubjectPaperCodeModuleSubModule } from 'src/app/shared/models/cloudbytes/subject-paper-code-module-sub-module';
import { GenericService } from 'src/app/shared/services/generic.service';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class SubjectPaperCodeModuleSubModuleService extends GenericService<SubjectPaperCodeModuleSubModule, SubjectPaperCodeModuleSubModule> {

    constructor(http: HttpClient, messageService: MessageService) {
        super(http, messageService, "SubjectPaperCodeModuleSubModule", environment.apiMastersUrl);
    }

    getBySubjectPaperCodeModuleId(subjectPaperCodeModuleId: number) {
        return this.http.get<SubjectPaperCodeModuleSubModule[]>(environment.apiMastersUrl + '/SubjectPaperCodeModuleSubModule/GetBySubjectPaperCodeModuleId/' + subjectPaperCodeModuleId);
    }
}