import { AuditModel } from "../commons/audit-model";

export class BankDetail extends AuditModel {
    id?: number;
    ledgerId?: number;
    bankName?: string;
    accountNumber?: string;
    ifsc?: string;
    branch?: string;
    status?: string;
}