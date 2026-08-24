import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { AcademicSessionProgram } from 'src/app/shared/models/cloudbytes/academic-session-program';
import { OperationalVertical } from 'src/app/shared/models/cloudbytes/operational-vertical';
import { GenericService } from 'src/app/shared/services/generic.service';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class OperationalVerticalService extends GenericService<OperationalVertical, OperationalVertical> {

    constructor(http: HttpClient, messageService: MessageService) {
        super(http, messageService, "OperationalVertical", environment.apiMastersUrl);
    }


    getOperationalVerticalByAcademicSession(acdemicSessionId: number) {
        return this.http.get<AcademicSessionProgram[]>(environment.apiMastersUrl + `/AcademicSessionProgram/GetByAcademicSession/${acdemicSessionId}`);
    }

    getOperationalVerticalByProgramId(programId: number) {
        return this.http.get<OperationalVertical[]>(environment.apiMastersUrl + '/OperationalVertical/GetOperationalVerticalByProgramId/' + programId);
    }
}