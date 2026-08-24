import { AuditModel } from "../commons/audit-model";

export class GstDetail extends AuditModel {
    id?: number;
    ledgerId?: number;
    gstNumber?: string;
    stateCode?: string;
    gstRegistrationType?: number;
    status?: string;
}