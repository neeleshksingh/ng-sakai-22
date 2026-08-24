import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DeductionComponent } from 'src/app/shared/models/smallbizgurus/deduction-component';
import { GenericService } from 'src/app/shared/services/generic.service';
import { environment } from 'src/environments/environment';


@Injectable({
    providedIn: 'root'
})

export class DeductionComponentService extends GenericService<DeductionComponent, DeductionComponent>{

    constructor(http: HttpClient, messageService: MessageService) {
        super(http, messageService, "DeductionComponent", environment.apiHumanResourcesUrl);
    }

}