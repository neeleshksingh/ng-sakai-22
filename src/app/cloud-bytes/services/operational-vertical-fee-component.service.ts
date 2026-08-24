import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { FilterOperationalVerticalFeeComponent, OperationalVerticalFeeComponent, OperationalVerticalFeeComponentSearchResponse } from 'src/app/shared/models/cloudbytes/operational-vertical-fee-component';
import { SessionProgramOvSearch } from 'src/app/shared/models/cloudbytes/session-program-ov-search';
import { GenericService } from 'src/app/shared/services/generic.service';
import { environment } from 'src/environments/environment';


@Injectable({
    providedIn: 'root'
})
export class OperationalVerticalFeeComponentService extends GenericService<OperationalVerticalFeeComponent, OperationalVerticalFeeComponent> {

    constructor(http: HttpClient, messageService: MessageService) {
        super(http, messageService, "OperationalVerticalFeeComponent", environment.apiMastersUrl);
    }
    getByOperationalVerticalFeeComponentRequest(filterOperationalVerticalFeeComponent: FilterOperationalVerticalFeeComponent) {
        return this.http.post<OperationalVerticalFeeComponent[]>(environment.apiMastersUrl + '/OperationalVerticalFeeComponent/GetByOperationalVerticalFeeComponentRequest', filterOperationalVerticalFeeComponent)
        .toPromise()
            .then(res => res as OperationalVerticalFeeComponent[])
            .then(data => data);
    }

    getOperationalVerticalFeeComponentExpandoByOperationalVerticalFeeComponentRequest(sessionProgramOvSearch: SessionProgramOvSearch) {
        return this.http.post<OperationalVerticalFeeComponentSearchResponse>(environment.apiMastersUrl + '/OperationalVerticalFeeComponent/GetOperationalVerticalFeeComponentExpandoByOperationalVerticalFeeComponentRequest', sessionProgramOvSearch);
    }
}