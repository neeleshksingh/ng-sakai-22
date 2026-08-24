import { BaseModel } from "../commons/base-model";

export class TaxRegime extends BaseModel {

}

export class TaxRegimeIncomeTaxSlabMapping extends BaseModel {
    payrollPeriodId?: number
    taxRegimeId?: number
    incomeTaxSlabId?: number
    payrollPeriodName?: string
    taxRegimeName?: string
    incomeTaxSlabName?: string
    taxPercentage?: number
}