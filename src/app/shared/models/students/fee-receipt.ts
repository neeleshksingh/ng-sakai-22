import { AuditModel } from "../commons/audit-model";

export class FeeReceipt extends AuditModel {
    id?: number;
    registrationNumber?: string;
    receiptDate?: Date;
    paymentDate?: Date;
    receiptNumber?: string;
    paidAmount?: number;
    adjustedAmount?: number;
    referenceNumber?: number;
    paymentMode?: number;
    paymentModeType?: number;
    remarks?: string;
    status?: string;
}