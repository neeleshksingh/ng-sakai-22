import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ExaminationProgramConfigurationData, ExaminationProgramConfigurationPagedData, ExaminationProgramConfigurationResponse, ExaminationProgramConfigurationSearch } from 'src/app/shared/models/knowledge-stand/examination-program-configuration';
import { GenericService } from 'src/app/shared/services/generic.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExaminationProgramConfigurationService  extends GenericService<ExaminationProgramConfigurationData, ExaminationProgramConfigurationData>{
 
    constructor(http: HttpClient, messageService: MessageService) {
        super(http, messageService, "ExaminationProgramConfiguration", environment.apiExaminationsUrl);
    }

  getByExaminationId(examinationId: number) {
      return this.http.get<ExaminationProgramConfigurationData[]>(environment.apiExaminationsUrl + '/ExaminationProgramConfiguration/GetByExamination/' + examinationId);
  }
  getByExaminationProgramId(examinationProgramId: number) {
      return this.http.get<ExaminationProgramConfigurationData[]>(environment.apiExaminationsUrl + '/ExaminationProgramConfiguration/GetByExaminationProgramId/' + examinationProgramId);
  }
  
 
  getExaminationProgramConfigurationListByQuery(searchText: string, pageIndex: number, sortBy: string, sortDirection: string, pageSize: number) {
      return this.http.get<ExaminationProgramConfigurationPagedData>(environment.apiExaminationsUrl + '/ExaminationProgramConfiguration/GetByQueryParameters?PageIndex=' + pageIndex + '&SortBy' + sortBy + '&SortDirection=' + sortDirection + '&PageSize=' + pageSize);
  }
 
 
  getExaminationProgramConfigurationByExaminationData(examinationId: number, academicSessionId: number, programId: number, operationalVerticalId: number) {
      return this.http.get<ExaminationProgramConfigurationData[]>(environment.apiExaminationsUrl + '/ExaminationProgramConfiguration/GetByExamination/' + examinationId + '/AcademicSession/' + academicSessionId + '/Program/' + programId + '/OperationalVertical/' + operationalVerticalId);
  }
  getExaminationProgramConfigurationByExaminationIdAcademicSessionIdProgramId(examinationId: number, academicSessionId: number, programId: number) {
        return this.http.get<ExaminationProgramConfigurationData[]>(environment.apiExaminationsUrl + '/ExaminationProgramConfiguration/GetByExamination/' + examinationId + '/AcademicSession/' + academicSessionId + '/Program/' + programId );
    }
     getExaminationProgramConfigurationByExaminationIdAcademicSessionId(examinationId: number, academicSessionId: number) {
        return this.http.get<ExaminationProgramConfigurationData[]>(environment.apiExaminationsUrl + '/ExaminationProgramConfiguration/GetByExamination/' + examinationId + '/AcademicSession/' + academicSessionId );
    }
  getByExaminationProgramConfigurationSearchRequest(examinationProgramConfigurationSearch: ExaminationProgramConfigurationSearch) {
      return this.http.post<ExaminationProgramConfigurationData>(environment.apiExaminationsUrl + '/ExaminationProgramConfiguration/GetByExaminationProgramConfigurationSearchRequest', examinationProgramConfigurationSearch);  
  }

  getByExaminationIdBatchCode(examinationId: number, batchCode: string) {
      return this.http.get<ExaminationProgramConfigurationResponse>(environment.apiExaminationsUrl + '/ExaminationProgramConfiguration/GetByExaminationId/' + examinationId + '/batchCode/' + batchCode);
  }

}
