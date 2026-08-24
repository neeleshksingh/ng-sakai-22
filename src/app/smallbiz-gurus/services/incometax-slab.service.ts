import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IncomeTaxSlab } from 'src/app/shared/models/smallbizgurus/income-tax-slab';
import { GenericServiceNols } from 'src/app/shared/services/generic-service-nols.service';
import { environment } from 'src/environments/environment';


@Injectable({
    providedIn: 'root'
})
export class IncomeTaxSlabService extends GenericServiceNols<IncomeTaxSlab, IncomeTaxSlab> {

    constructor(http: HttpClient) {
        super(http, "IncomeTaxSlab", environment.apiHumanResourcesUrl);
    }
}