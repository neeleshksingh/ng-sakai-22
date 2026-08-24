import { BaseModel } from "../commons/base-model";

export class CancelledReceipt extends BaseModel {
    registrationNumber?: string;
    receiptNumber?: string;
    remarks?: string;
}