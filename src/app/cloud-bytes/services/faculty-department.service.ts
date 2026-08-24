import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { FacultyDepartment } from 'src/app/shared/models/cloudbytes/faculty-department';
import { GenericService } from 'src/app/shared/services/generic.service';
import { environment } from 'src/environments/environment';


@Injectable({
    providedIn: 'root'
})
export class FacultyDepartmentService extends GenericService<FacultyDepartment, FacultyDepartment> {

    constructor(http: HttpClient,  messageService: MessageService) {
        super(http, messageService, "FacultyDepartment", environment.apiMastersUrl);
    }
}