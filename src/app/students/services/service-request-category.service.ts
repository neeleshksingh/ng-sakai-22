import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServiceRequestCategory } from 'src/app/shared/models/students/service-request-category';
import { environment } from 'src/environments/environment';


@Injectable({
    providedIn: 'root'
})
export class ServiceRequestCategoryService {

    constructor(private http: HttpClient) { }

    getServiceRequestCategoryList() {
        return this.http.get<ServiceRequestCategory[]>(environment.apiStudentsUrl + '/ServiceRequestCategory/GetAll');
    }
    getByServiceRequestWorkgroupId(workgroupId:string) {
        return this.http.get<ServiceRequestCategory[]>(environment.apiStudentsUrl + '/ServiceRequestCategory/GetByServiceRequestWorkgroupId/'+workgroupId);
    }
    getServiceRequestCategoryById(serviceRequestCategoryId: number) {
        return this.http.get<ServiceRequestCategory>(environment.apiStudentsUrl + '/ServiceRequestCategory/GetByIntId/' + serviceRequestCategoryId);
    }
    getServiceRequestCategoryByTerm(serviceRequestCategoryTerm: string) {
        return this.http.get<ServiceRequestCategory>(environment.apiStudentsUrl + '/ServiceRequestCategory/GetByTerms/' + serviceRequestCategoryTerm);
    }
    saveServiceRequestCategory(serviceRequestCategory: ServiceRequestCategory) {
        return this.http.post<ServiceRequestCategory>(environment.apiStudentsUrl + '/ServiceRequestCategory/Add', serviceRequestCategory);
    }
    saveServiceRequestCategorys(serviceRequestCategorys: ServiceRequestCategory[]) {
        return this.http.post<ServiceRequestCategory[]>(environment.apiStudentsUrl + '/ServiceRequestCategory/AddMultiple', serviceRequestCategorys, {observe: 'response'});
    }
    updateServiceRequestCategory(serviceRequestCategory: ServiceRequestCategory) {
        return this.http.put<ServiceRequestCategory>(environment.apiStudentsUrl + '/ServiceRequestCategory/UpdateById',serviceRequestCategory);
    }
    deleteServiceRequestCategory(serviceRequestCategoryId: number) {
        return this.http.post<ServiceRequestCategory>(environment.apiStudentsUrl + `/ServiceRequestCategory/DeleteByIntId/${serviceRequestCategoryId}` ,null );
    }
}