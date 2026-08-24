import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { CasteCategory } from 'src/app/shared/models/cloudbytes/caste-category';
import { GenericService } from 'src/app/shared/services/generic.service';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class CasteCategoryService extends GenericService<CasteCategory, CasteCategory> {

    constructor(http: HttpClient, messageService: MessageService) {
        super(http, messageService, "CasteCategory", environment.apiMastersUrl);
    }
}