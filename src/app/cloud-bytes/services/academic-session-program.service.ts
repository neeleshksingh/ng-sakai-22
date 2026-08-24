import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { AcademicSessionProgram } from 'src/app/shared/models/cloudbytes/academic-session-program';
import { OvSubjectSearch } from 'src/app/shared/models/cloudbytes/operational-vertical-subject';
import { GenericService } from 'src/app/shared/services/generic.service';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AcademicSessionProgramService extends GenericService<AcademicSessionProgram, AcademicSessionProgram> {

    constructor(http: HttpClient, messageService: MessageService) {
        super(http,messageService, "AcademicSessionProgram", environment.apiMastersUrl);
    }

    getAcademicSessionProgramListByAcademicSessionId(academicSessionId: number) {
        return this.http.get<AcademicSessionProgram[]>(environment.apiMastersUrl + '/AcademicSessionProgram/GetAcademicSessionProgramByAcademicSessionId/' + academicSessionId);
    }

    getAcademicSessionProgramListByAcademicSessionIdProgramId(academicSessionId: number, programId: number) {
        return this.http.get<AcademicSessionProgram[]>(environment.apiMastersUrl + '/AcademicSessionProgram/GetByAcademicSession/' + academicSessionId + '/Program/' + programId);
    }

    getAcademicSessionProgramListByAcademicSessionIdProgramIdOperationalVerticalId(academicSessionId: number, programId: number, operationalVerticalId: number) {
        return this.http.get<AcademicSessionProgram[]>(environment.apiMastersUrl + '/AcademicSessionProgram/GetByAcademicSession/' + academicSessionId + '/Program/' + programId + '/OperationalVertical/' + operationalVerticalId);
    }

    getAcademicSessionProgramExpandoByAcademicSessionProgramSearchRequest(ovSubjectSearch: OvSubjectSearch) {
        return this.http.post(environment.apiMastersUrl + '/AcademicSessionProgram/GetAcademicSessionProgramExpandoByAcademicSessionProgramSearchRequest',  ovSubjectSearch)
    }
}