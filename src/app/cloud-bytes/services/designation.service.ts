import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Designation } from 'src/app/shared/models/cloudbytes/designation';
import { GenericService } from 'src/app/shared/services/generic.service';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class DesignationService extends GenericService<Designation, Designation> {

    constructor(http: HttpClient, messageService: MessageService) {
        super(http, messageService, "Designation", environment.apiMastersUrl);
    }
}