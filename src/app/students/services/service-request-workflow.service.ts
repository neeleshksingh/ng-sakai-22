import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServiceRequestWorkflow } from 'src/app/shared/models/students/service-request-workflow';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServiceRequestWorkflowService {

  constructor(private http: HttpClient) { }

  addServiceRequestWorkFlow(serviceRequestWorkflow: ServiceRequestWorkflow) {
    return this.http.post<ServiceRequestWorkflow>(environment.apiStudentsUrl + '/ServiceRequestWorkFlow/Add', serviceRequestWorkflow);
  }
  getServiceRequestWorkFlowByServiceRequestId(serviceRequestId: number) {
    return this.http.get<ServiceRequestWorkflow[]>(environment.apiStudentsUrl + '/ServiceRequestWorkFlow/GetServiceRequestWorkFlowByServiceRequestId/' + serviceRequestId);
  }
}
