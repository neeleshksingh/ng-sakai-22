import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ServiceRequestWorkgroup } from 'src/app/shared/models/cloudbytes/service-request-workgroup';
import { GenericService } from 'src/app/shared/services/generic.service';
import { environment } from 'src/environments/environment';


@Injectable({
    providedIn: 'root'
})
export class ServiceRequestWorkgroupService extends GenericService<ServiceRequestWorkgroup, ServiceRequestWorkgroup> {

    constructor(http: HttpClient, messageService: MessageService) {
        super(http, messageService, "ServiceRequestWorkgroup", environment.apiMastersUrl);
    }

    getByServiceRequestDepartmentId(departmentId: string) {
        return this.http.get<ServiceRequestWorkgroup[]>(environment.apiMastersUrl + '/ServiceRequestWorkgroup/GetByServiceRequestDepartmentId/' + departmentId);
    }
}