import { AuditModel } from "../commons/audit-model";

export class AccountLedger extends AuditModel {
    id?: number;
    name?: string;
    accountGroupId?: number;
    accountNatureTypeId?: number;
    accountNatureTypeName?: string;
    openingBalance?: number;
    openingBalanceDate?: Date;
    openingBalanceTransactionTypeId?: number;
    openingBalanceTransactionTypeName?: string;
    closingBalance?: number;
    closingBalanceDate?: Date;
    closingBalanceTransactionTypeId?: number;
    closingBalanceTransactionTypeName?: string;
    currentBalance?: number;
    isPartyLedger?: boolean;
    partyDetailId?: number;
    isBankLedger?: boolean;
    bankDetailId?: number;
    isGstApplicable?: boolean;
    gstDetailId?: number;
    partyDetail?: PartyDetail;
    gstDetail?: GstDetail;
    bankDetail?: BankDetail;
    status?: string;
    accountGroupName?: string;

    _isAddNew?: boolean; // Used for UI purpose to identify if the ledger is being added in the grid directly
    _typedName?: string; // Used for UI purpose to hold the typed name before selecting from dropdown when adding ledger in the grid
}

export class PartyDetail extends AuditModel {
    id?: number;
    website?: string;
    state?: string;
    country?: string;
    pinCode?: string;
    pan?: string;

    contactPerson?: string;
    phoneNumber?: string;
    email?: string;
    address?: string;
    status?: string
}

export class GstDetail extends AuditModel {
    id?: number;
    gstNumber?: string;
    stateCode?: string;
    gstRegistrationType?: number;
    status?: string;

    gstRegistrationTypeName?: string;
}

export class BankDetail extends AuditModel {
    id?: number;
    bankName?: string;
    accountHolderName?: string;
    accountNumber?: string;
    ifsc?: string;
    branch?: string;
    pinCode?: string;
    status?: string
}