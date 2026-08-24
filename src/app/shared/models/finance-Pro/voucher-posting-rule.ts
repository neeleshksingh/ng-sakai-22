import { AuditModel } from "../commons/audit-model";

export class VoucherPostingRule extends AuditModel {
    id?: number;
    voucherTypeId?: number;
    accountNatureTypeId?: number;
    postingSide?: string;
    isMandatory?: boolean;
    isPartyLedgerRequired?: boolean;
    status?: string;
}

export class VoucherPostingRuleResponse extends VoucherPostingRule {
    voucherTypeName?: string;
    accountNatureTypeName?: string;
}