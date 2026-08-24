import { BaseModel } from "../commons/base-model";

export class PaymentChallanFeeComponent extends BaseModel{
    feeAmount?: number;
    feeComponentId?: number;
    operationalVerticalId?: number;
    paymentChallanId?: number;
    programId?: number;
    studentFeeMasterId?: number;
}