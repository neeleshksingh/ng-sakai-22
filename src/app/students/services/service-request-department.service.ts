import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServiceRequestDepartment } from 'src/app/shared/models/students/service-request-department';
import { environment } from 'src/environments/environment';
@Injectable({
    providedIn: 'root'
})
export class ServiceRequestDepartmentService {

    constructor(private http: HttpClient) { }

    getServiceRequestDepartmentList() {
        return this.http.get<ServiceRequestDepartment[]>(environment.apiStudentsUrl + '/ServiceRequestDepartment/GetAll');
    }
    getServiceRequestDepartmentById(serviceRequestDepartmentId: number) {
        return this.http.get<ServiceRequestDepartment>(environment.apiStudentsUrl + '/ServiceRequestDepartment/GetByIntId/' + serviceRequestDepartmentId);
    }
    getServiceRequestDepartmentByTerm(serviceRequestDepartmentTerm: string) {
        return this.http.get<ServiceRequestDepartment>(environment.apiStudentsUrl + '/ServiceRequestDepartment/GetByTerms/' + serviceRequestDepartmentTerm);
    }
    saveServiceRequestDepartment(serviceRequestDepartment: ServiceRequestDepartment) {

        return this.http.post<ServiceRequestDepartment>(environment.apiStudentsUrl + '/ServiceRequestDepartment/Add', serviceRequestDepartment);
    }
    saveServiceRequestDepartments(serviceRequestDepartments: ServiceRequestDepartment[]) {

        return this.http.post<ServiceRequestDepartment[]>(environment.apiStudentsUrl + '/ServiceRequestDepartment/AddMultiple', serviceRequestDepartments, {observe: 'response'});
    }
    updateServiceRequestDepartment(serviceRequestDepartment: ServiceRequestDepartment) {

        return this.http.put<ServiceRequestDepartment>(environment.apiStudentsUrl + '/ServiceRequestDepartment/UpdateById',
            serviceRequestDepartment);
    }
    deleteServiceRequestDepartment(serviceRequestDepartmentId: number) {
        return this.http.post<ServiceRequestDepartment>(environment.apiStudentsUrl + `/ServiceRequestDepartment/DeleteByIntId/${serviceRequestDepartmentId}` ,null );

    }
}