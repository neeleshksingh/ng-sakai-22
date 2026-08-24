import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Building } from 'src/app/shared/models/cloudbytes/building';
import { GenericService } from 'src/app/shared/services/generic.service';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class BuildingService extends GenericService<Building, Building> {

    constructor(http: HttpClient, messageService: MessageService) {
        super(http, messageService, "Building", environment.apiMastersUrl);
    }
}