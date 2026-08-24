import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { MessageService } from 'primeng/api';
import { Speciality } from 'src/app/shared/models/cloudbytes/speciality';
import { GenericService } from 'src/app/shared/services/generic.service';


@Injectable({
    providedIn: 'root'
})

export class SpecialityService extends  GenericService<Speciality, Speciality>{
    constructor(http: HttpClient,messageService: MessageService) {
        super(http,  messageService, "Speciality", environment.apiHumanResourcesUrl);
    }
}