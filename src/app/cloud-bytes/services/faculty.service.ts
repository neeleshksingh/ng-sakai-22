import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Faculty } from 'src/app/shared/models/cloudbytes/faculty';
import { GenericService } from 'src/app/shared/services/generic.service';
import { environment } from 'src/environments/environment';


@Injectable({
    providedIn: 'root'
})
export class FacultyService extends GenericService<Faculty, Faculty> {

    constructor(http: HttpClient,  messageService: MessageService) {
        super(http, messageService, "Faculty", environment.apiMastersUrl);
    }
}