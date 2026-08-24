import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { PartnerAppSetting } from 'src/app/shared/models/developers/partner-app-setting';
import { GenericGlobalService } from 'src/app/shared/services/generic-service-global.service';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class PartnerAppSettingService extends GenericGlobalService<PartnerAppSetting, PartnerAppSetting> {

    constructor(http: HttpClient, messageService: MessageService) {
        super(http, messageService, "PartnerAppSetting", environment.apiGlobalUrl);
    }
    getByName(PartnerAppSettingName: string) {
        return this.http.get<PartnerAppSetting[]>(environment.apiGlobalUrl + '/PartnerAppSetting/GetByName/' + PartnerAppSettingName);
    }
}