import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StudentExaminationTopper, TopperStudentRequest } from 'src/app/shared/models/knowledge-stand/topper-list';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class TopperListConfigurationService {

  constructor(private http: HttpClient) { }

  GetStudentExaminationTopperByStudentExaminationTopperSearchRequest(topperStudentRequest: TopperStudentRequest, viewType:string ) {
      return this.http.post<StudentExaminationTopper>(environment.apiGlobalUrl + '/ExaminationResult/GetStudentExaminationTopperByStudentExaminationTopperSearchRequest/'+viewType,
      topperStudentRequest);
    }
}
