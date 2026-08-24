import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServiceRequestWorkgroup } from 'src/app/shared/models/students/service-request-workgroup';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ServiceRequestWorkgroupService {

    constructor(private http: HttpClient) { }

    getServiceRequestWorkgroupList() {
        return this.http.get<ServiceRequestWorkgroup[]>(environment.apiStudentsUrl + '/ServiceRequestWorkgroup/GetAll');
    }
    getByServiceRequestDepartmentId(departmentId:string) {
        return this.http.get<ServiceRequestWorkgroup[]>(environment.apiStudentsUrl + '/ServiceRequestWorkgroup/GetByServiceRequestDepartmentId/'+departmentId);
    }
    getServiceRequestWorkgroupById(serviceRequestWorkgroupId: number) {
        return this.http.get<ServiceRequestWorkgroup>(environment.apiStudentsUrl + '/ServiceRequestWorkgroup/GetByIntId/' + serviceRequestWorkgroupId);
    }
    getServiceRequestWorkgroupByTerm(serviceRequestWorkgroupTerm: string) {
        return this.http.get<ServiceRequestWorkgroup>(environment.apiStudentsUrl + '/ServiceRequestWorkgroup/GetByTerms/' + serviceRequestWorkgroupTerm);
    }
    saveServiceRequestWorkgroup(serviceRequestWorkgroup: ServiceRequestWorkgroup) {

        return this.http.post<ServiceRequestWorkgroup>(environment.apiStudentsUrl + '/ServiceRequestWorkgroup/Add', serviceRequestWorkgroup);
    }
    saveServiceRequestWorkgroups(serviceRequestWorkgroups: ServiceRequestWorkgroup[]) {

        return this.http.post<ServiceRequestWorkgroup[]>(environment.apiStudentsUrl + '/ServiceRequestWorkgroup/AddMultiple', serviceRequestWorkgroups, {observe: 'response'});
    }
    updateServiceRequestWorkgroup(serviceRequestWorkgroup: ServiceRequestWorkgroup) {

        return this.http.put<ServiceRequestWorkgroup>(environment.apiStudentsUrl + '/ServiceRequestWorkgroup/UpdateById',
            serviceRequestWorkgroup);
    }
    deleteServiceRequestWorkgroup(serviceRequestWorkgroupId: number) {
        return this.http.post<ServiceRequestWorkgroup>(environment.apiStudentsUrl + `/ServiceRequestWorkgroup/DeleteByIntId/${serviceRequestWorkgroupId}` ,null );

    }
}