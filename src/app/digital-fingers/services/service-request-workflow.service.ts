import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ServiceRequestWorkflow } from 'src/app/shared/models/digital-fingers/service-request-workflow';
import { GenericService } from 'src/app/shared/services/generic.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class ServiceRequestWorkflowService  extends GenericService<ServiceRequestWorkflow, ServiceRequestWorkflow>{

  constructor(http: HttpClient, messageService: MessageService) {
    super(http, messageService, "ServiceRequestWorkFlow", environment.apiDigitalFingersUrl);
}

  

  getServiceRequestWorkFlowByServiceRequestId(serviceRequestId: number) {
    return this.http.get<ServiceRequestWorkflow[]>(environment.apiDigitalFingersUrl + '/ServiceRequestWorkFlow/GetServiceRequestWorkFlowByServiceRequestId/' + serviceRequestId);
  }
}
