import { Voucher } from "./voucher";

export class AccountGroupVoucherSummary {
    companyId?: number;
    companyName?: string;
    accountGroupId?: number;
    accountGroupName?: string;
    fromDate?: Date;
    toDate?: Date;
    openingBalance?: number;
    currentTotalDebit?: number;
    currentTotalCredit?: number;
    closingBalance?: number;
    voucherEntryList?: Voucher[];
}