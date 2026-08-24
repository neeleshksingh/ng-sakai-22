import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { ExaminationGrading, ExaminationGradingPagedData, ExaminationGradingRequest, ExaminationGradingSearchResponse } from 'src/app/shared/models/knowledge-stand/examination-grading';
import { ExaminationGradingSearch } from 'src/app/shared/models/knowledge-stand/examination-grading-search';
import { GenericService } from 'src/app/shared/services/generic.service';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ExaminationGradingService  extends GenericService<ExaminationGrading,ExaminationGrading> {

  constructor(http: HttpClient, messageService: MessageService) {
      super(http, messageService, "ExaminationGrading", environment.apiExaminationsUrl);
  }
  getExaminationGradingByAcademicSessionId(academicSessionId: number): Observable<ExaminationGrading[]> {
    return this.http.get<ExaminationGrading[]>(environment.apiExaminationsUrl + '/ExaminationGrading/GetByAcademicSession/' + academicSessionId);
  }

  getByExaminationGradingSearchRequest(examinationGradingSearch: ExaminationGradingSearch) {
    return this.http.post<ExaminationGradingSearchResponse>(environment.apiExaminationsUrl + '/ExaminationGrading/GetByExaminationGradingSearchRequest', examinationGradingSearch);
  }

  getExaminationGradingByQuery(searchText: string, pageIndex: number, sortBy: string, sortDirection: string, pageSize: number) {
    return this.http.get<ExaminationGradingPagedData>(environment.apiExaminationsUrl + '/ExaminationGrading/GetByQueryParameters?PageIndex=' + pageIndex + '&SortBy' + sortBy + '&SortDirection=' + sortDirection + '&PageSize=' + pageSize);
  }

  insertByExaminationGradingRequest(examinationGradingRequest: ExaminationGradingRequest) {
    return this.http.post<ExaminationGrading[]>(environment.apiExaminationsUrl + '/ExaminationGrading/InsertByExaminationGradingRequest', examinationGradingRequest);
  }
  examinationGradingTemplateByPaperTypeId(paperTypeId:number){
      return this.http.get<any[]>(environment.apiExaminationsUrl + `/ExaminationGrading/GetExaminationGradingTemplateByPaperTypeId/${paperTypeId}`);

  }
}
