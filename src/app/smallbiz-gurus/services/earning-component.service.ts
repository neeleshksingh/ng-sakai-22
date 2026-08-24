import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { EarningComponent } from 'src/app/shared/models/smallbizgurus/earning-component';
import { GenericService } from 'src/app/shared/services/generic.service';
import { environment } from 'src/environments/environment';


@Injectable({
    providedIn: 'root'
})

export class EarningComponentService extends GenericService<EarningComponent, EarningComponent> {

    constructor(http: HttpClient, messageService: MessageService) {
        super(http, messageService, "EarningComponent", environment.apiHumanResourcesUrl);
    }
}