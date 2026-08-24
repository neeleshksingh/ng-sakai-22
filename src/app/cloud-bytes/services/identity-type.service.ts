import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { IdentityType } from 'src/app/shared/models/cloudbytes/identity-type';
import { GenericService } from 'src/app/shared/services/generic.service';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class IdentityTypeService extends GenericService<IdentityType, IdentityType> {

    constructor(http: HttpClient, messageService: MessageService) {
        super(http, messageService, "IdentityType", environment.apiMastersUrl);
    }
}