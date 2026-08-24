import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { VoucherPostingRule, VoucherPostingRuleResponse } from 'src/app/shared/models/finance-Pro/voucher-posting-rule';
import { GenericService } from 'src/app/shared/services/generic.service';
import { environment } from 'src/environments/environment';


@Injectable({
    providedIn: 'root'
})

export class VoucherPostingRuleService extends GenericService<VoucherPostingRule, VoucherPostingRuleResponse> {

    constructor(http: HttpClient, messageService: MessageService) {
        super(http, messageService, "VoucherPostingRule", environment.apiAccountsUrl);
    }
}