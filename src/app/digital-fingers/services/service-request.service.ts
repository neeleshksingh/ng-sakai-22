import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ServiceRequest } from 'src/app/shared/models/digital-fingers/service-request';
import { ServiceRequestAttachment } from 'src/app/shared/models/digital-fingers/service-request-attachment';
import { GenericService } from 'src/app/shared/services/generic.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class ServiceRequestService extends GenericService<ServiceRequest, ServiceRequest>{

  constructor(http: HttpClient, messageService: MessageService) {
    super(http, messageService, "ServiceRequest", environment.apiDigitalFingersUrl);
  }

  updateServiceRequestById(serviceRequest: ServiceRequest){
    return this.http.put<ServiceRequest>(environment.apiDigitalFingersUrl + '/ServiceRequest/UpdateById', serviceRequest);
  }
  
  getServiceRequestAttachmentByServiceRequestId(serviceRequestId: number) {
    return this.http.get<ServiceRequestAttachment[]>(environment.apiDigitalFingersUrl + '/ServiceRequest/GetServiceRequestAttachmentByServiceRequestId/' + serviceRequestId);
  }
}
