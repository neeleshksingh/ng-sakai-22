import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { OperationalVerticalFeeComponent, OperationalVerticalFeeComponentSearchResponse } from 'src/app/shared/models/cloudbytes/operational-vertical-fee-component';
import { AcademicSessionProgramOVRequest } from 'src/app/shared/models/commons/academic-session-program-ov-request.model';
import { GenericService } from 'src/app/shared/services/generic.service';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class OVFeeComponentService extends GenericService<OperationalVerticalFeeComponent, OperationalVerticalFeeComponent> {

    constructor(http: HttpClient,  messageService: MessageService) {
        super(http, messageService, "OperationalVerticalFeeComponent", environment.apiMastersUrl);
    }
    getOVFeeComponentExpandoByOVFeeComponentRequest(payload: AcademicSessionProgramOVRequest) {
        return this.http.post<OperationalVerticalFeeComponentSearchResponse>(environment.apiMastersUrl + '/OperationalVerticalFeeComponent/GetOperationalVerticalFeeComponentExpandoByOperationalVerticalFeeComponentRequest', payload);
    }
}