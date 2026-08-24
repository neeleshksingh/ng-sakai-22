import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServiceRequestSubCategory } from 'src/app/shared/models/students/service-request-sub-category';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ServiceRequestSubCategoryService {

    constructor(private http: HttpClient) { }

    getServiceRequestSubCategoryList() {
        return this.http.get<ServiceRequestSubCategory[]>(environment.apiStudentsUrl + '/ServiceRequestSubCategory/GetAll');
    }
    getByServiceRequestCategoryId(getByServiceRequestCategoryId:string) {
        return this.http.get<ServiceRequestSubCategory[]>(environment.apiStudentsUrl + '/ServiceRequestSubCategory/GetByServiceRequestCategoryId/'+getByServiceRequestCategoryId);
    }
    getServiceRequestSubCategoryById(serviceRequestSubCategoryId: number) {
        return this.http.get<ServiceRequestSubCategory>(environment.apiStudentsUrl + '/ServiceRequestSubCategory/GetByIntId/' + serviceRequestSubCategoryId);
    }
    getServiceRequestSubCategoryByTerm(serviceRequestSubCategoryTerm: string) {
        return this.http.get<ServiceRequestSubCategory>(environment.apiStudentsUrl + '/ServiceRequestSubCategory/GetByTerms/' + serviceRequestSubCategoryTerm);
    }
    saveServiceRequestSubCategory(serviceRequestSubCategory: ServiceRequestSubCategory) {
        return this.http.post<ServiceRequestSubCategory>(environment.apiStudentsUrl + '/ServiceRequestSubCategory/Add', serviceRequestSubCategory);
    }
    saveServiceRequestSubCategorys(serviceRequestSubCategorys: ServiceRequestSubCategory[]) {
        return this.http.post<ServiceRequestSubCategory[]>(environment.apiStudentsUrl + '/ServiceRequestSubCategory/AddMultiple', serviceRequestSubCategorys, {observe: 'response'})
    }
    updateServiceRequestSubCategory(serviceRequestSubCategory: ServiceRequestSubCategory) {
        return this.http.put<ServiceRequestSubCategory>(environment.apiStudentsUrl + '/ServiceRequestSubCategory/UpdateById',
            serviceRequestSubCategory);
    }
    deleteServiceRequestSubCategory(serviceRequestSubCategoryId: number) {
        return this.http.post<ServiceRequestSubCategory>(environment.apiStudentsUrl + `/ServiceRequestSubCategory/DeleteByIntId/${serviceRequestSubCategoryId}` ,null )
    }
}