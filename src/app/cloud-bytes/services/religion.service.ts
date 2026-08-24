import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Religion } from 'src/app/shared/models/cloudbytes/religion';
import { GenericService } from 'src/app/shared/services/generic.service';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ReligionService extends GenericService<Religion, Religion> {

    constructor(http: HttpClient, messageService: MessageService) {
        super(http, messageService, "Religion", environment.apiMastersUrl);
    }
}