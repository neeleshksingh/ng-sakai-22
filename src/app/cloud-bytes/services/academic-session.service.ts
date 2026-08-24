import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { AcademicSession } from 'src/app/shared/models/cloudbytes/academic-session';
import { GenericService } from 'src/app/shared/services/generic.service';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AcademicSessionService extends GenericService<AcademicSession, AcademicSession> {

    constructor(http: HttpClient, messageService: MessageService) {
        super(http, messageService, "AcademicSession", environment.apiMastersUrl);
    }
}