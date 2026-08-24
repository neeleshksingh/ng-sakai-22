import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ExaminationEvaluator, ExaminationEvaluatorBooklet, ExaminationEvaluatorResponse } from 'src/app/shared/models/knowledge-stand/examination-evaluator';
import { ExaminationEvaluatorBookletSearchRequest } from 'src/app/shared/models/knowledge-stand/examination-evaluator-booklet-search-request';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExaminationEvaluatorService {

  constructor(private http: HttpClient) { }
  getExaminationAttendanceByExaminationAndSubjectPaperCodeId(examinationId: number, subjectPaperCodeId: number) {
    return this.http.get<ExaminationEvaluatorResponse[]>(environment.apiExaminationsUrl+'/ExaminationEvaluator/GetExaminationBookletData/Examination/' + examinationId + '/SubjectPaperCode/' + subjectPaperCodeId);
  }
  add(examinationEvaluatorResponse: ExaminationEvaluatorResponse) {
    return this.http.post<ExaminationEvaluatorResponse[]>(environment.apiExaminationsUrl+'/ExaminationEvaluator/Add',examinationEvaluatorResponse);
  }
  getExaminationEvaluatorByRequest(examinationEvaluatorBookletSearchRequest:ExaminationEvaluatorBookletSearchRequest)
  {
    return this.http.post<ExaminationEvaluatorResponse[]>(environment.apiExaminationsUrl+'/ExaminationEvaluator/GetExaminationEvaluatorByRequest',examinationEvaluatorBookletSearchRequest);
  }
  updateExaminationBooklets(examinationEvaluatorBooklets:ExaminationEvaluatorBooklet[])
  {
    return this.http.put<ExaminationEvaluatorResponse[]>(environment.apiExaminationsUrl+'/ExaminationEvaluator/UpdateExaminationBooklets',examinationEvaluatorBooklets);
  }
  getExaminationBookletToBeReturnedByExaminationIdFacultyCode(examinationId:number,facultyCode:string)
  {
    return this.http.get<ExaminationEvaluatorResponse[]>(environment.apiExaminationsUrl+'/ExaminationEvaluator/GetExaminationBookletToBeReturned/Examination/'+examinationId+'/FacultyCode/'+facultyCode);
  }
  returnExaminationBooklets(examinationEvaluator:ExaminationEvaluator)
  {
    return this.http.post<ExaminationEvaluatorResponse>(environment.apiExaminationsUrl+'/ExaminationEvaluator/ReturnExaminationBooklets',examinationEvaluator);
  }
  getExaminationBookletToBeReIssuedByExaminationIdFacultyCode(examinationId:number,facultyCode:string)
  {
    return this.http.get<ExaminationEvaluatorResponse[]>(environment.apiExaminationsUrl+'/ExaminationEvaluator/GetExaminationBookletToBeReIssued/Examination/'+examinationId+'/FacultyCode/'+facultyCode);
  }
  reIssueExaminationBooklets(examinationEvaluators:ExaminationEvaluator)
  {
    return this.http.post<ExaminationEvaluatorResponse>(environment.apiExaminationsUrl+'/ExaminationEvaluator/ReIssueExaminationBooklets',examinationEvaluators);
  }
​
}
