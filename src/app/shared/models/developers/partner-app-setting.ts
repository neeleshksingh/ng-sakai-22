import { AuditModel } from "../commons/audit-model";

export class PartnerAppSetting extends AuditModel {
    id?: number;
    name?: string;
    type?: string;
    value?: string;
    status?: string;
}