import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Subject } from 'src/app/shared/models/cloudbytes/subject';
import { GenericService } from 'src/app/shared/services/generic.service';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class SubjectService extends GenericService<Subject, Subject> {

    constructor(http: HttpClient, messageService: MessageService) {
        super(http, messageService, "Subject", environment.apiMastersUrl);
    }
}