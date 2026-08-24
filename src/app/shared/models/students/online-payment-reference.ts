import { AuditModel } from "../commons/audit-model";
import { RazorOrderResponse } from "./razor-order-response";

export class OnlinePaymentReference extends AuditModel{
    id?:number;
    referenceNumber?: string;
    paymentOrderId?:string;
    paymentEntity?:string;
    currency?:string;
    paymentReceipt?:string;
    attempts?:number;
    registrationNumber?: string;
    feeAmount?: number;
    paidAmount?: number;
    adjustedAmount?: number;
    requestDate?: string;
    paymentStatus?: string;
    receiptNumber?: string;
    transactionNumber?:string;
    transactionDate?:string;

    PaymentModeType?:string;
    PaymentCode?:string;
    PaymentDescription?:string;
    PaymentSource?:string;
    PaymentStep?:string;
    PaymentReason?:string;
    PaymentMetaData?:string;
    PaymentId?:string;
    PaymentSignature?:string;

    status?: string;
    createdByName?: string;
    modifiedByName?: string; 
}
export class OnlinePaymentReferenceDetails extends AuditModel{
    id?: number;
    onlinePaymentReferenceId?: number;
    studentFeeMasterId?: number;
    programId?: number;
    operationalVerticalId?: number;
    feeComponentId?: number;
    feeAmount?: number;
    lastDueAmount?: number;
    paidAmount?: number;
    // not available
    adjustedAmount?: number;
    
    status?: string;
    createdByName?: string;
    modifiedByName?: string;
}

export class OnlinePaymentReferenceRequest
{
   onlinePaymentReference?: OnlinePaymentReference;
   onlinePaymentReferenceDetails?:OnlinePaymentReferenceDetails[];
}

export class OnlinePaymentReferenceResponse
{
   onlinePaymentReference?: OnlinePaymentReference;
   onlinePaymentReferenceDetails?:OnlinePaymentReferenceDetails[];
   paymentOrderResponse?: RazorOrderResponse
}