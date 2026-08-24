import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { PaperType } from 'src/app/shared/models/cloudbytes/paper-type';
import { GenericService } from 'src/app/shared/services/generic.service';
import { environment } from 'src/environments/environment';


@Injectable({
    providedIn: 'root'
})
export class PaperTypeService extends GenericService<PaperType, PaperType> {

    constructor(http: HttpClient, messageService: MessageService) {
        super(http,  messageService, "PaperType", environment.apiMastersUrl);
    }
}