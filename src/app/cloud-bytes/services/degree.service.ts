import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Degree } from 'src/app/shared/models/cloudbytes/degree';
import { GenericService } from 'src/app/shared/services/generic.service';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class DegreeService extends GenericService<Degree, Degree> {

    constructor(http: HttpClient, messageService: MessageService) {
        super(http, messageService, "Degree", environment.apiMastersUrl);
    }
}