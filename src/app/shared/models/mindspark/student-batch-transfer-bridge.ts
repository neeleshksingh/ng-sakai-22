import { AuditModel } from "../commons/audit-model";

export class StudentBatchTransferBridge extends AuditModel {
    id?: number;
    academicSessionId?: number;
    programId?: number;
    operationalVerticalId?: number;
    subjectId?: number;
    subjectPaperCodeId?: number;
    registrationNumber?: string;
    batchCode?: string;
    status?: string;
}