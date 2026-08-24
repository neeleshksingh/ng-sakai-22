import { AuditModel } from "../commons/audit-model";

export class BookPurchaseRequisition extends AuditModel {
    id?: number;
    date?: any;
    requisitionNumber?: string;
    remarks?: string;
    quantity?: string;
    status?: string;
    purchaseRequisitionDetails?: BookPurchaseRequisitionDetails[];

    slno?: number;
}

export class BookPurchaseRequisitionDetails extends AuditModel {
    id?: number;
    bookPurchaseRequisitionId?: number;
    titleOfBook?: string;
    nameOfAuthor?: string;
    publisher?: string;
    bookCategoryId?: number;
    isbn?: string;
    edition?: string;
    publishedYear?: string;
    unitPrice?: number;
    quantity?: number;
    referenceBooks?: string;
    status?: string;
}

export class BookPurchaseRequisitionDetailsResponse extends BookPurchaseRequisitionDetails {
    bookCategoryName?: string;
}