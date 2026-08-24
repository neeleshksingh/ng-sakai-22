import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BacklogExaminationApplicationReport } from 'src/app/shared/models/knowledge-stand/backlog-application-report';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ExaminationBacklogApplicationService {

  constructor(private http:HttpClient) { }

  getBacklogExaminationApplicationByExamination(examinationId:number) {
    return this.http.get<any>(environment.apiExaminationsUrl + '/ExaminationBacklogApplication/GetBacklogExaminationApplicationByExamination/'+ examinationId);
  }

  getBacklogExaminationApplicationByExaminationRegistrationNumber(examinationId:number, registrationNumber : string) {
    return this.http.get<BacklogExaminationApplicationReport[]>(environment.apiExaminationsUrl + '/ExaminationBacklogApplication/GetBacklogExaminationApplicationByExamination/' + examinationId + '/RegistrationNumber/' + registrationNumber);
  }
}