export class StatisticsReport {
    totalVoucherCount?: number;
    totalEntryCount?: number;
    accountGroups?: AccountGroups[];
}

interface AccountGroups {
    accountGroupId?: number;
    accountGroupName?: string;
    voucherCount?: number;
    entryCount?: number;
    totalDebit?: number;
    totalCredit?: number;
    ledgers?: Ledgers[];
}

interface Ledgers {
    accountLedgerId?: number;
    accountLedgerName?: string;
    voucherCount?: number;
    entryCount?: number;
    totalDebit?: number;
    totalCredit?: number;
    voucherTypes?: VoucherTypes[];
}

interface VoucherTypes {
    voucherTypeId?: number;
    voucherTypeName?: string;
    voucherCount?: number;
    entryCount?: number;
    totalDebit?: number;
    totalCredit?: number;
    voucherEntries?: VoucherEntries[];
}

interface VoucherEntries {
    voucherId?: number;
    voucherDate?: string;
    voucherNumber?: string;
    particulars?: string;
    debitAmount?: number;
    creditAmount?: number;
    narration?: string;
}