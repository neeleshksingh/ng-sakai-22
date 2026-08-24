import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { PartnerContactNumber } from 'src/app/shared/models/cloudbytes/partner-contact-number';
import { GenericService } from 'src/app/shared/services/generic.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PartnerContactNumberService extends GenericService<PartnerContactNumber, PartnerContactNumber> {

  constructor(http: HttpClient, messageService: MessageService) {
    super(http, messageService, "PartnerContactNumber", environment.apiMastersUrl);
  }

  getByPartnerCategoryId(partnerCategoryId: number) {
    return this.http.get<PartnerContactNumber[]>(environment.apiMastersUrl + '/PartnerContactNumber/GetByPartnerContactCategoryId/' + partnerCategoryId);
  }

  download() {
    return this.http.get<any>(environment.apiMastersUrl + '/PartnerContactNumber/Download');
  }
}
