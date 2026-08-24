import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { FeeComponent } from 'src/app/shared/models/cloudbytes/fee-component';
import { GenericGlobalService } from 'src/app/shared/services/generic-service-global.service';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class FeeComponentService extends GenericGlobalService<FeeComponent, FeeComponent> {

    constructor(http: HttpClient, messageService: MessageService) {
        super(http, messageService, "FeeComponent", environment.apiGlobalUrl);
    }
}