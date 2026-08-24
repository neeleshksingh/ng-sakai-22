import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { GstDetail } from 'src/app/shared/models/finance-Pro/gst-detail';
import { GenericService } from 'src/app/shared/services/generic.service';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class GstDetailService extends GenericService<GstDetail, GstDetail> {

    baseUrl: string = `${environment.apiAccountsUrl}/GstDetail`;
    constructor(http: HttpClient, messageService: MessageService) {
        super(http, messageService, "GstDetail", environment.apiAccountsUrl);
    }

    getGstDetailsByAccountLedgerId(accountLedgerId: number) {
        return this.http.get<GstDetail>(`${this.baseUrl}/GetByAccountLedgerId/${accountLedgerId}`);
    }
}