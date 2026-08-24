import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ServiceRequestSubCategory } from 'src/app/shared/models/cloudbytes/service-request-sub-category';
import { GenericService } from 'src/app/shared/services/generic.service';
import { environment } from 'src/environments/environment';


@Injectable({
    providedIn: 'root'
})
export class ServiceRequestSubCategoryService extends GenericService<ServiceRequestSubCategory, ServiceRequestSubCategory> {

    constructor(http: HttpClient, messageService: MessageService) {
        super(http, messageService, "ServiceRequestSubCategory", environment.apiMastersUrl);
    }

    getByServiceRequestCategoryId(getByServiceRequestCategoryId: string) {
        return this.http.get<ServiceRequestSubCategory[]>(environment.apiMastersUrl + '/ServiceRequestSubCategory/GetByServiceRequestCategoryId/' + getByServiceRequestCategoryId);
    }
}