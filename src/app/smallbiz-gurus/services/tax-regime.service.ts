import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { TaxRegime } from 'src/app/shared/models/smallbizgurus/tax-regime';
import { GenericServiceNols } from 'src/app/shared/services/generic-service-nols.service';


@Injectable({
    providedIn: 'root'
})

export class TaxRegimeService extends  GenericServiceNols<TaxRegime, TaxRegime>{

    constructor(http: HttpClient) {
        super(http, "TaxRegime", environment.apiHumanResourcesUrl);
    }
}