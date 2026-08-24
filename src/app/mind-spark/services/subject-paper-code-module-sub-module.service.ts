import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SubjectPaperCodeModuleSubModule } from 'src/app/shared/models/cloudbytes/subject-paper-code-module-sub-module';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class SubjectPaperCodeModuleSubModuleService {

    constructor(private http: HttpClient) { }

    getBySubjectPaperCodeIdVersion(subjectPaperCodeId: number, version: string) {
        return this.http.get<SubjectPaperCodeModuleSubModule[]>(environment.apiAcademicsUrl + '/SubjectPaperCodeModuleSubModule/GetBySubjectPaperCodeId/' + subjectPaperCodeId + '/version/' + version);
    }
}