import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServiceRequest } from 'src/app/shared/models/students/service-request';
import { ServiceRequestAttachment } from 'src/app/shared/models/students/service-request-attachment';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServiceRequestService {

  constructor(private http: HttpClient) { }

  raiseServiceRequest(serviceRequest: ServiceRequest) {
    return this.http.post<ServiceRequest>(environment.apiStudentsUrl + '/ServiceRequest/Add', serviceRequest);
  }
  uploadAttachmentsByServiceRequestId(serviceRequestId: number, formData: FormData) {
    return this.http.post<ServiceRequest>(environment.apiStudentsUrl + '/ServiceRequest/UploadAttachments/ServiceRequestId/' + serviceRequestId, formData);
  }
  getServiceRequestByStudentId(studentId : string){
    return this.http.get<ServiceRequest[]>(environment.apiStudentsUrl + '/ServiceRequest/GetByStudentId/' + studentId);
  }
  getServiceRequestById(serviceRequestId: number){
    return this.http.get<ServiceRequest>(environment.apiStudentsUrl + '/ServiceRequest/GetById/' + serviceRequestId);
  }
  getServiceRequestAttachmentByServiceRequestId(serviceRequestId: number) {
    return this.http.get<ServiceRequestAttachment[]>(environment.apiStudentsUrl + '/ServiceRequest/GetServiceRequestAttachmentByServiceRequestId/' + serviceRequestId);
  }
}
