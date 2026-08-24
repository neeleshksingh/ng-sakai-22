import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { GenericService } from 'src/app/shared/services/generic.service';
import { environment } from 'src/environments/environment';

import { ConcessionCategory } from 'src/app/shared/models/cloudbytes/concession-category';

@Injectable({
    providedIn: 'root'
})
export class ConcessionCategoryService extends GenericService<ConcessionCategory, ConcessionCategory> {

    constructor(http: HttpClient, messageService: MessageService) {
        super(http, messageService, "ConcessionCategory", environment.apiMastersUrl);
    }
}