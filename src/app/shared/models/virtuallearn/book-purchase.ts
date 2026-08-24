import { AuditModel } from "../commons/audit-model";

export class BookPurchase extends AuditModel {
    id?: number;
    bookPurchaseOrderId?: number;
    vendorId?: number;
    vendorName?: number;
    billNumber?: string;
    billDate?: Date;
    invoiceNumber?: string;
    invoiceDate?: Date;
    quantity?: number;
    amount?: number;
    discount?: number;
    netAmount?: number;
    taxRate?: number;
    taxAmount?: number;
    totalAmount?: number;
    status?: string;
    bookPurchaseDetailResponses?: BookPurchaseDetails[];
}

export class BookPurchaseDetails extends AuditModel {
    id?: number;
    bookPurchaseOrderDetailId?: number;
    bookPurchaseId?: number;
    bookId?: number;
    bookName?: string;
    bookCategoryId?: number;
    bookCategoryName?: string;
    unitPrice?: number;
    quantity?: number;
    discount?: number;
    netAmount?: number;
    taxRate?: number;
    taxAmount?: number;
    totalAmount?: number;
    accessionNumber?: string;
    status?: string;
}