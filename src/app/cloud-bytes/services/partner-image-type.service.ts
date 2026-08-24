import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { PartnerImageType } from 'src/app/shared/models/cloudbytes/partner';
import { GenericService } from 'src/app/shared/services/generic.service';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class PartnerImageTypeService extends GenericService<PartnerImageType, PartnerImageType> {

    constructor(http: HttpClient, messageService: MessageService) {
        super(http, messageService, "PartnerImageType", environment.apiMastersUrl);
    }
}