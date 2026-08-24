import { AuditModel } from "../commons/audit-model";

export class AdmitCardSearch extends AuditModel {
    examinationId?: number;
    academicSessionId?: number;
    programId?: number;
    operationalVerticalId?: number;
    registrationNumber?: string;
    description?: string;
    id?: number=0;
    status?: string;
}