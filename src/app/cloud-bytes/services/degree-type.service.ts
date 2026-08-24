import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DegreeType } from 'src/app/shared/models/cloudbytes/degree-type';
import { GenericService } from 'src/app/shared/services/generic.service';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class DegreeTypeService extends GenericService<DegreeType, DegreeType> {

    constructor(http: HttpClient, messageService: MessageService) {
        super(http, messageService, "DegreeType", environment.apiMastersUrl);
    }
}