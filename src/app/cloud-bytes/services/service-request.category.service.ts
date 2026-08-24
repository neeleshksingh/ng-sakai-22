import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ServiceRequestCategory } from 'src/app/shared/models/cloudbytes/service-request-category';
import { GenericService } from 'src/app/shared/services/generic.service';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ServiceRequestCategoryService extends GenericService<ServiceRequestCategory, ServiceRequestCategory> {

    constructor(http: HttpClient, messageService: MessageService) {
        super(http, messageService, "ServiceRequestCategory", environment.apiMastersUrl);
    }

    getByServiceRequestWorkgroupId(workgroupId: string) {
        return this.http.get<ServiceRequestCategory[]>(environment.apiMastersUrl + '/ServiceRequestCategory/GetByServiceRequestWorkgroupId/' + workgroupId);
    }
}