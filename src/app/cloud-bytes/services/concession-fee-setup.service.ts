import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ConcessionFeeSetup, ConcessionFeeSetupSearchResponse } from 'src/app/shared/models/cloudbytes/concession-fee-setup';
import { SessionProgramOvSearch } from 'src/app/shared/models/cloudbytes/session-program-ov-search';
import { GenericService } from 'src/app/shared/services/generic.service';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ConcessionFeeSetupService extends GenericService<ConcessionFeeSetup, ConcessionFeeSetup> {

    constructor(http: HttpClient, messageService: MessageService) {
        super(http, messageService, "ConcessionFeeSetup", environment.apiMastersUrl);
    }

    concessionFeeSetupExpandoByConcessionFeeSetupSearchRequest(sessionProgramOvSearch: SessionProgramOvSearch) {
        return this.http.post<ConcessionFeeSetupSearchResponse>(environment.apiMastersUrl + '/ConcessionFeeSetup/ConcessionFeeSetupExpandoByConcessionFeeSetupSearchRequest', sessionProgramOvSearch);
    }
}