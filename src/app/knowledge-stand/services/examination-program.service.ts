import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ExaminationProgram, ExaminationProgramsResponse } from 'src/app/shared/models/knowledge-stand/examination-program';
import { ExaminationProgramConfigurationSearch } from 'src/app/shared/models/knowledge-stand/examination-program-configuration';
import { GenericService } from 'src/app/shared/services/generic.service';
import { environment } from 'src/environments/environment';


@Injectable({
    providedIn: 'root'
})
export class ExaminationProgramService  extends GenericService<ExaminationProgram, ExaminationProgram> {

  constructor(http: HttpClient, messageService: MessageService) {
    super(http, messageService, "ExaminationProgram", environment.apiExaminationsUrl);
}
    getByExaminationId(examinationId: number) {
        return this.http.get<ExaminationProgram[]>(environment.apiExaminationsUrl + '/ExaminationProgram/GetByExaminationId/' + examinationId);
    }
    getByExaminationProgramSearchResponse(examinationProgramConfigurationSearch: ExaminationProgramConfigurationSearch) {
        return this.http.post<ExaminationProgramsResponse>(environment.apiExaminationsUrl + '/ExaminationProgram/GetByExaminationProgramSearchRequest', examinationProgramConfigurationSearch);
    }

    getByExaminationProgram(activeYear: number, SemesterType: string) {
        return this.http.get<ExaminationProgramsResponse>(environment.apiExaminationsUrl + 'ExaminationProgram/GetByActiveYear/' + activeYear + '/SemesterType/' + SemesterType);
    }
    getByAcademicSessionAndProgramId(academicSessionId: number, programId: number){
        return this.http.get<ExaminationProgram[]>(environment.apiExaminationsUrl + '/ExaminationProgram/GetByAcademicSession/' + academicSessionId + '/Program/' + programId);
    }
}