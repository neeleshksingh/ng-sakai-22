import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { OperationalVerticalSubjectConfiguration } from 'src/app/shared/models/cloudbytes/operational-vertical-subject-configuration';
import { SessionProgramOvSearch } from 'src/app/shared/models/cloudbytes/session-program-ov-search';
import { SessionProgramOvSearchPagedData, SessionProgramOvSearchResponse } from 'src/app/shared/models/cloudbytes/session-program-ov-search-response';
import { GenericService } from 'src/app/shared/services/generic.service';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class OperationalVerticalSubjectConfigurationService extends GenericService<OperationalVerticalSubjectConfiguration, OperationalVerticalSubjectConfiguration> {

    constructor(http: HttpClient, messageService: MessageService) {
        super(http, messageService, "OperationalVerticalSubjectConfiguration", environment.apiMastersUrl);
    }

    getOperationalVerticalSubjectConfigurationExpandoByOperationalVerticalSubjectConfigurationSearchRequest(sessionProgramOvSearch: SessionProgramOvSearch) {
        return this.http.post<SessionProgramOvSearchResponse>(environment.apiMastersUrl + '/OperationalVerticalSubjectConfiguration/GetOperationalVerticalSubjectConfigurationExpandoByOperationalVerticalSubjectConfigurationSearchRequest', sessionProgramOvSearch);
    }
    getOperationalVerticalSubjectByQueryParameters(searchText: string, pageIndex: number, sortBy: string, sortDirection: string, pageSize: number) {
        return this.http.get<SessionProgramOvSearchPagedData>(environment.apiMastersUrl + '/OperationalVerticalSubjectConfiguration/GetByQueryParameters?PageIndex=' + pageIndex + '&SortBy' + sortBy + '&SortDirection=' + sortDirection + '&PageSize=' + pageSize);
    }
}