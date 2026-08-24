import { AuditModel } from "../commons/audit-model";

export class BookPurchaseOrderDetail extends AuditModel {
    id?: number;
    bookPurchaseRequisitionId?:number;
    bookPurchaseRequisitionDetailId?: number;
    bookPurchaseOrderId?: number;
    bookId?: number;
    quantity?: number;
    status?: string;

    titleOfBook?: string;
    nameOfAuthor?: string;
    publisher?: string;
    isbn?: string;
    edition?: string;
    publishedYear?: string;
    unitPrice?: number;
    requistionQuantity?: number;
    requisitionNumber?: string;
    isReceived?: boolean;
}