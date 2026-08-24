import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { TaxRegimeIncomeTaxSlabMapping } from 'src/app/shared/models/smallbizgurus/tax-regime';
import { GenericServiceNols } from 'src/app/shared/services/generic-service-nols.service';


@Injectable({
    providedIn: 'root'
})
export class TaxRegimeIncomeTaxSlabMappingService extends GenericServiceNols<TaxRegimeIncomeTaxSlabMapping, TaxRegimeIncomeTaxSlabMapping> {

    constructor(http: HttpClient) {
        super(http, "TaxRegimeIncomeTaxSlabMapping", environment.apiHumanResourcesUrl);
    }
    getTaxRegimeIncomeTaxSlabMappingByPayrollPeriodId(payrollPeriodId: number) {
        return this.http.get<any>(environment.apiHumanResourcesUrl + '/TaxRegimeIncomeTaxSlabMapping/GetByPayrollPeriod/' + payrollPeriodId)
    }

    getTaxRegimeIncomeTaxSlabMappingByPayrollPeriodIdAndTaxRegimeId(payrollPeriodId: number, taxRegimeId: number) {
        return this.http.get<any>(environment.apiHumanResourcesUrl + '/TaxRegimeIncomeTaxSlabMapping/GetByPayrollPeriod/' + payrollPeriodId + '/TaxRegime/' + taxRegimeId)
    }
}