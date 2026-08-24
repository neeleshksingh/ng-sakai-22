import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Caste } from 'src/app/shared/models/cloudbytes/caste';
import { GenericGlobalService } from 'src/app/shared/services/generic-service-global.service';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class CasteService extends GenericGlobalService<Caste, Caste> {

    constructor(http: HttpClient, messageService: MessageService) {
        super(http, messageService, "Caste", environment.apiGlobalUrl);
    }
}