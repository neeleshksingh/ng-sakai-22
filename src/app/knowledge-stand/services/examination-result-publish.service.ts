import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BacklogHistory } from 'src/app/shared/models/knowledge-stand/backlog-history';
import { ExaminationResultPublish } from 'src/app/shared/models/knowledge-stand/examination-result-publish';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExaminationResultPublishService {

  constructor(private http: HttpClient) { }
  getExaminationResultPublish(request: any): Observable<ExaminationResultPublish[]> {
    return this.http.post<ExaminationResultPublish[]>(environment.apiExaminationsUrl + '/ExaminationProgram/GetExaminationResultPublish', request);
  }

  updateExaminationResultPublishByHOE(request: any): Observable<ExaminationResultPublish[]> {
    return this.http.post<ExaminationResultPublish[]>(environment.apiExaminationsUrl + '/ExaminationProgram/UpdateExaminationResultPublishByHOE', request);
  }

  updateExaminationResultPublishByRegistrar(request: any): Observable<ExaminationResultPublish[]> {
    return this.http.post<ExaminationResultPublish[]>(environment.apiExaminationsUrl + '/ExaminationProgram/UpdateExaminationResultPublishByRegistrar', request);
  }

  updateExaminationResultPublishByVC(request: any): Observable<ExaminationResultPublish[]> {
    return this.http.post<ExaminationResultPublish[]>(environment.apiExaminationsUrl + '/ExaminationProgram/UpdateExaminationResultPublishByVC', request);
  }

  updateExaminationResultPublishByCOE(request: any): Observable<ExaminationResultPublish[]> {
    return this.http.post<ExaminationResultPublish[]>(environment.apiExaminationsUrl + '/ExaminationProgram/UpdateExaminationResultPublishByCOE', request);
  }
  GetStudentExaminatinBacklogHistoryByStudentId(studentId:string): Observable<BacklogHistory[]> {
      return this.http.get<BacklogHistory[]>(environment.apiExaminationsUrl + '/ExaminationResult/GetStudentExaminatinBacklogHistoryByStudentId/'+studentId);
  }
}