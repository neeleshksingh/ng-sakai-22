import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StudentExaminationResponse } from 'src/app/shared/models/knowledge-stand/examination';
import { StudentExaminationResultResponse } from 'src/app/shared/models/knowledge-stand/examination-result';
import { StudentConsolidatedMarksStatement } from 'src/app/shared/models/knowledge-stand/student-consolidated-marks-statement';
import { StudentExaminationTopper, TopperStudentRequest } from 'src/app/shared/models/knowledge-stand/topper-list';
import { environment } from 'src/environments/environment';


@Injectable({
    providedIn: 'root'
})
export class ResultService {

  constructor(private http: HttpClient) { }

  studentExaminationResponse?: StudentExaminationResponse;

  getStudentSubjectPaperCodeMarksList(examinationResultSearch: any) {
    return this.http.post<StudentExaminationResultResponse>(environment.apiExaminationsUrl + '/ExaminationResult/GetByExaminationResultProgramWiseSearchRequest',
      examinationResultSearch);
  }
  getStudentExamination(studentId: string) {
    return this.http.get<StudentExaminationResponse>(environment.apiExaminationsUrl + '/Examination/GetByStudentId/' + studentId);
  }
  getByExaminationResultStudentWise(examinationResultStudentWise: any) {
    return this.http.post<StudentExaminationResultResponse>(environment.apiExaminationsUrl + '/ExaminationResult/GetByExaminationResultStudentWiseSearchRequest',
      examinationResultStudentWise);
  }
  downloadByExaminationResultStudentWiseSearchRequest(examinationResultSearch: any) {
    return this.http.post<any>(environment.apiExaminationsUrl + '/ExaminationResult/DownloadByExaminationResultStudentWiseSearchRequest',
      examinationResultSearch);
  }
  downloadByExaminationResultProgramWiseSearchRequest(examinationResultStudentWise: any) {
    return this.http.post<any>(environment.apiExaminationsUrl + '/ExaminationResult/DownloadByExaminationResultProgramWiseSearchRequest',
      examinationResultStudentWise);
  }
  GetStudentExaminationTopperByStudentExaminationTopperSearchRequest(topperStudentRequest: TopperStudentRequest, viewType:string ) {
    return this.http.post<StudentExaminationTopper>(environment.apiExaminationsUrl + '/ExaminationResult/GetStudentExaminationTopperByStudentExaminationTopperSearchRequest/'+viewType,
    topperStudentRequest);
  }

  getStudentConsolidatedMarksStatementByExaminationId(examinationId: number) {
    return this.http.get<StudentConsolidatedMarksStatement>(environment.apiExaminationsUrl + '/ExaminationResult/GetStudentConsolidatedMarksStatementByExaminationId/' + examinationId);
  }
  getExaminationResultAnalysisByExaminationId(examinationId: number){
    return this.http.get<any>(environment.apiExaminationsUrl + '/ExaminationResult/ExaminationResultAnalysisByExaminationId/' + examinationId);
  }
  DownloadHtmlByExaminationResultStudentWiseSearchRequest(examinationResultStudentWise:any){
    return this.http.post<any>(environment.apiExaminationsUrl + '/ExaminationResult/DownloadHtmlByExaminationResultStudentWiseSearchRequest' , examinationResultStudentWise);
  }
}
