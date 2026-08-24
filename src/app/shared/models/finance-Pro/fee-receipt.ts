import { BaseModel } from "../commons/base-model";

export class FeeReceipt extends BaseModel {
    registrationNumber?: string;
    studentId ?: string;
    studentName?: string;
    receiptDate?: string;
    paymentDate?: string;
    receiptNumber?: string;
    excessAmount?: number;
    paidAmount?: number;
    adjustedAmount?: number;
    referenceNumber?: string;
    paymentMode?: number;
    paymentModeType?: number;
    remarks?: string;
    isCancelledButton?:boolean=false;
}
export class FeeReceiptDetails extends  BaseModel {
    StudentFeeMasterId?: number;
    feeReceiptId?: number;
    programId?: number;
    operationalVerticalId?: number;
    feeComponentId?: number;
    feeAmount?: number;
    paidAmount?: number;
    adjustedAmount?:number;
}
export class FeeReceiptRequest {
    feeReceipt?: FeeReceipt;
    feeReceiptDetails?: FeeReceiptDetails[];
}
export class FeeReceiptResponse {
    feeReceipts!: FeeReceipt[];
    feeReceiptDetails!: FeeReceiptDetails[];
}