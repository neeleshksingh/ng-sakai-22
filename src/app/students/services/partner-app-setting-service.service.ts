import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PartnerAppSetting } from 'src/app/shared/models/developers/partner-app-setting';
import { environment } from 'src/environments/environment';
@Injectable({
    providedIn: 'root'
})
export class PartnerAppSettingService {
    constructor(private http: HttpClient) { }
    getByName(PartnerAppSettingName:string){
        return this.http.get<PartnerAppSetting[]>(environment.apiStudentsUrl + '/PartnerAppSetting/GetByName/'+PartnerAppSettingName);
    }
}