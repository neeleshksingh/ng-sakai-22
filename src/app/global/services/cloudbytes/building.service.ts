import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Building } from 'src/app/shared/models/cloudbytes/building';
import { GenericGlobalService } from 'src/app/shared/services/generic-service-global.service';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class BuildingService extends GenericGlobalService<Building, Building> {

    constructor(http: HttpClient, messageService: MessageService) {
        super(http, messageService, "Building", environment.apiGlobalUrl);
    }
}