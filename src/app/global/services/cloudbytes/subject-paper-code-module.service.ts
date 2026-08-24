import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { SubjectPaperCodeModule } from 'src/app/shared/models/cloudbytes/subject-paper-code-module';
import { SubjectPaperCodeModuleSubModuleExpando } from 'src/app/shared/models/cloudbytes/subject-paper-code-module-submodule-expando';
import { GenericService } from 'src/app/shared/services/generic.service';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class SubjectPaperCodeModuleService extends GenericService<SubjectPaperCodeModule, SubjectPaperCodeModule> {

    constructor(http: HttpClient, messageService: MessageService) {
        super(http, messageService, "SubjectPaperCodeModule", environment.apiGlobalUrl);
    }

    getBySubjectPaperCodeId(subjectPaperCodeId: number, version: string) {
        return this.http.get<SubjectPaperCodeModule[]>(environment.apiGlobalUrl + '/SubjectPaperCodeModule/GetBySubjectPaperCodeId/' + subjectPaperCodeId + '/version/' + version);
    }

    getSubjectPaperCodeModuleSubModuleExpandoBySubjectPaperCodeIdByVersion(subjectPaperCodeId : number, version : string){
        return this.http.get<SubjectPaperCodeModuleSubModuleExpando[]>(environment.apiGlobalUrl + `/SubjectPaperCodeModule/GetSubjectPaperCodeModuleSubModuleExpandoBySubjectPaperCodeId/${subjectPaperCodeId}/version/${version}`);
    }
}
