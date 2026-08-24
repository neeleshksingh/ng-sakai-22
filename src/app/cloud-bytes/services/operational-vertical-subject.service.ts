import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { OperationalVerticalSubject, OperationalVerticalSubjectSearchResponse, OvSubjectSearch } from 'src/app/shared/models/cloudbytes/operational-vertical-subject';
import { GenericService } from 'src/app/shared/services/generic.service';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class OperationalVerticalSubjectService extends GenericService<OperationalVerticalSubject, OperationalVerticalSubject> {

    constructor(http: HttpClient, messageService: MessageService) {
        super(http, messageService, "OperationalVerticalSubject", environment.apiMastersUrl);
    }

    getOperationalVerticalSubjectSearchResponse(ovSubjectSearch: OvSubjectSearch) {
        return this.http.post<OperationalVerticalSubjectSearchResponse>(environment.apiMastersUrl + '/OperationalVerticalSubject/GetByOperationalVerticalSubjectSearchRequest', ovSubjectSearch);
    }
}