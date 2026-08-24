import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Voucher, VoucherResponse } from 'src/app/shared/models/finance-Pro/voucher';
import { GenericService } from 'src/app/shared/services/generic.service';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class VoucherService extends GenericService<Voucher, VoucherResponse> {

    constructor(http: HttpClient, messageService: MessageService) {
        super(http, messageService, "Voucher", environment.apiAccountsUrl);
    }
}