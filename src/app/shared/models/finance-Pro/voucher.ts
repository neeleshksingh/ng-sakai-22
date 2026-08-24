import { AuditModel } from "../commons/audit-model";
import { VoucherEntry } from "./voucher-entry";

export class Voucher extends AuditModel {
    id?: number;
    voucherTypeId?: number;
    financialYearId?: number;
    voucherDate?: Date;
    voucherNumber?: string;
    totalAmount?: number;
    narration?: string;
    status?: string;
    voucherEntryList?: VoucherEntry[];
}

export class VoucherResponse extends Voucher {
    voucherTypeName?: string;
}