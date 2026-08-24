export class AccountGroupLedgerSummary {
    companyId?: number;
    companyName?: string;
    accountGroupId?: number;
    accountGroupName?: string;
    fromDate?: Date;
    toDate?: Date;
    grandTotal?: number;
    accountLedgerResponseList?: AccountLedgerResponseList[];
}

export class AccountLedgerResponseList {
    accountGroupName?: string;
    openingBalanceTransactionTypeName?: string;
    closingBalance?: number;
    id?: number;
    name?: string;
    accountGroupId?: number;
    openingBalance?: number;
    openingBalanceTransactionTypeId?: number;
    isPartyLedger?: boolean;
    partyDetailId?: number;
    isBankLedger?: boolean;
    bankDetailId?: number;
    isGstApplicable?: boolean;
    gstDetailId?: number;
    status?: string;
}