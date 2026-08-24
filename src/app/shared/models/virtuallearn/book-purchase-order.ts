import { AuditModel } from "../commons/audit-model";
import { BookPurchaseOrderDetail } from "./book-purchase-order-detail";

export class BookPurchaseOrder extends AuditModel{
    id?: number;
    orderDate?: any;
    orderNumber?: string;
    vendorId?: number;
    vendorName?: string;
    requisitionNumber?: string;
    status?: string;
    bookPurchaseOrderDetails?: BookPurchaseOrderDetail[];
}

export class BookPurchaseOrderResponse extends BookPurchaseOrder{
    quantity?: number;
    isReceived?: boolean;
    bookPurchaseOrderDetailResponses?: BookPurchaseOrderDetail[];
}