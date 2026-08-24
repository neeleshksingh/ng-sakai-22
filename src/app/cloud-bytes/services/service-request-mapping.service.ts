import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { GetBySearchRequest, ServiceRequestMapping, ServiceRequestMappingResponse } from 'src/app/shared/models/cloudbytes/service-request-mapping';
import { GenericService } from 'src/app/shared/services/generic.service';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ServiceRequestMappingService extends GenericService<ServiceRequestMapping, ServiceRequestMappingResponse> {

    constructor(http: HttpClient, messageService: MessageService) {
        super(http, messageService, "ServiceRequestMapping", environment.apiMastersUrl);
    }

    getBySearchRequest(getBySearchRequest: GetBySearchRequest) {
        return this.http.post<ServiceRequestMappingResponse[]>(environment.apiMastersUrl + '/ServiceRequestMapping/GetBySearchRequest', getBySearchRequest);
    }
}