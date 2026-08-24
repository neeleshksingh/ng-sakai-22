import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CurriculumFramework } from 'src/app/shared/models/students/curriculam-framework';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CurriculumFrameworkService {

 constructor(private http: HttpClient) { }
 
 getOperationalVerticalSubject(academicSessionId: number, programId: number, operationalVerticalId: number) {
         return this.http.get<CurriculumFramework[]>(environment.apiStudentsUrl + '/OperationalVerticalSubject/GetByAcademicSession/' + academicSessionId + '/Program/' + programId + '/OperationalVertical/' + operationalVerticalId)
     }
     getModuleSubModule(subjectPaperCodeId: number, version: string) {
      return this.http.get<CurriculumFramework[]>(environment.apiStudentsUrl + '/SubjectPaperCodeModule/GetSubjectPaperCodeModuleSubModuleExpandoBySubjectPaperCodeId/' + subjectPaperCodeId + '/version/' + version )
  }

}
