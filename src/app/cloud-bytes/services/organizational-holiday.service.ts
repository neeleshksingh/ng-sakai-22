import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { HolidayRequest, HolidayResponse } from 'src/app/shared/models/cloudbytes/holiday';
import { GenericService } from 'src/app/shared/services/generic.service';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class OrganizationalHolidayService extends GenericService<HolidayRequest, HolidayResponse> {

    constructor(http: HttpClient,  messageService: MessageService) {
        super(http, messageService, "OrganizationalHoliday", environment.apiMastersUrl);
    }

    getOrganizationalHolidayByYear(holidayYear: string) {
        return this.http.get<HolidayResponse[]>(environment.apiMastersUrl + '/OrganizationalHoliday/GetOrganizationalHolidayByYear/' + holidayYear);
    }
}