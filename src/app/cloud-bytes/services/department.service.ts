import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Department } from 'src/app/shared/models/cloudbytes/department';
import { GenericService } from 'src/app/shared/services/generic.service';
import { environment } from 'src/environments/environment';


@Injectable({
    providedIn: 'root'
})
export class DepartmentService extends GenericService<Department, Department> {

    constructor(http: HttpClient,  messageService: MessageService) {
        super(http, messageService, "Department", environment.apiMastersUrl);
    }
}