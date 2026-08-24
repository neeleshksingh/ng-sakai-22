import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { PartnerContactCategory } from 'src/app/shared/models/cloudbytes/partner-contact-category';
import { GenericService } from 'src/app/shared/services/generic.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PartnerContactCategoryService extends GenericService<PartnerContactCategory, PartnerContactCategory> {

  constructor(http: HttpClient, messageService: MessageService) {
    super(http, messageService, "PartnerContactCategory", environment.apiMastersUrl);
  }
}