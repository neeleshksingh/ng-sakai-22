import { AuditModel } from "../commons/audit-model";

export class VoucherEntry extends AuditModel {
    id?: number;
    voucherId?: number;
    accountLedgerId?: number;
    amount?: number;
    transactionTypeId?: number;
    closingBalance?: number;
    closingBalanceTransactionTypeId?: number;
    status?: string;
    accountLedgerName?: string;
    transactionTypeName?: string;
    closingBalanceTransactionTypeName?: string
}