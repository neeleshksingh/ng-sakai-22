import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { AcademicSession } from 'src/app/shared/models/cloudbytes/academic-session';
import { GenericGlobalService } from 'src/app/shared/services/generic-service-global.service';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AcademicSessionService extends GenericGlobalService<AcademicSession, AcademicSession> {

    constructor(http: HttpClient, messageService: MessageService) {
        super(http, messageService, "AcademicSession", environment.apiGlobalUrl);
    }
}