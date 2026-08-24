import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { SubjectType } from 'src/app/shared/models/cloudbytes/subject-type';
import { GenericService } from 'src/app/shared/services/generic.service';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class SubjectTypeService extends GenericService<SubjectType, SubjectType> {

    constructor(http: HttpClient, messageService: MessageService) {
        super(http, messageService, "SubjectType", environment.apiMastersUrl);
    }
}