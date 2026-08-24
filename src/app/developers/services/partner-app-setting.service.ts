import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { PartnerAppSetting } from 'src/app/shared/models/developers/partner-app-setting';
import { GenericService } from 'src/app/shared/services/generic.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PartnerAppSettingService extends GenericService<PartnerAppSetting, PartnerAppSetting> {

  constructor(http: HttpClient, messageService: MessageService) {
    super(http, messageService, "PartnerAppSetting", environment.apiMastersUrl);
  }
}
