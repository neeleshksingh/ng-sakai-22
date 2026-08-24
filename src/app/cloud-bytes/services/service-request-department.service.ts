import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ServiceRequestDepartment } from 'src/app/shared/models/cloudbytes/service-request-department';
import { GenericService } from 'src/app/shared/services/generic.service';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ServiceRequestDepartmentService extends GenericService<ServiceRequestDepartment, ServiceRequestDepartment> {

    constructor(http: HttpClient, messageService: MessageService) {
        super(http, messageService, "ServiceRequestDepartment", environment.apiMastersUrl);
    }
}