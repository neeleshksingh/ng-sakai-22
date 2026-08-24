import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Caste } from 'src/app/shared/models/cloudbytes/caste';
import { GenericService } from 'src/app/shared/services/generic.service';
import { environment } from 'src/environments/environment';


@Injectable({
    providedIn: 'root'
})
export class CasteService extends GenericService<Caste, Caste> {

    constructor(http: HttpClient, messageService: MessageService) {
        super(http, messageService, "Caste", environment.apiMastersUrl);
    }
}