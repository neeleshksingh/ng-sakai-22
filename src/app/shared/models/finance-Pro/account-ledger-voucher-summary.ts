import { Voucher } from "./voucher";

export class AccountLedgerVoucherSummary {
    companyId?: number;
    companyName?: string;
    accountGroupId?: number;
    accountGroupName?: string;
    accountLedgerId?: number;
    accountLedgerName?: string;
    fromDate?: Date;
    toDate?: Date;
    openingBalance?: number;
    currentTotalDebit?: number;
    currentTotalCredit?: number;
    closingBalance?: number;
    voucherEntryList?: Voucher[];
}