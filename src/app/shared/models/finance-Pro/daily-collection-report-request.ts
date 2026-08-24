export class DailyCollectionReportRequest {
    fromReceiptDate?: any;
    toReceiptDate?: any;
    fromPaymentDate?: any;
    toPaymentDate?: any;
    academicSessionIds?: number[];
    programIds?: number[];
    operationalVerticalIds?: number[];
    feeComponentIds?: number[];
    registrationNumbers?: string[];
    isCancelledReceipt?: boolean;
}