import { AuditModel } from "../commons/audit-model";

export class StudentExcessAmount extends AuditModel {
    id?: number;
    registrationNumber?: string;
    excessAmount?: number;
    balanceExcessAmount?: number;
    remarks?: string;
    status?: string;
}