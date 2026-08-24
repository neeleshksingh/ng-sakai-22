import { AuditModel } from "../commons/audit-model";

export class StudentBatchTransferByRegistration extends AuditModel {
    id?: number;
    operationalVerticalId?: number;
    operationalVerticalName?: string;
    studentName?: string;
    subjectPaperCodeName?: string;
    studentId?: string;
    registrationNumber?: string;
    subjectPaperCodeId?: number;
    batchTransferType?: number;
    batchTransferTypeString?: string;
    fromBatchCode?: string;
    fromBatchLastCycleAttended?: string;
    toBatchCode?: string;
    toBatchCycleEntered?: string;
    isActive?: boolean;
    status?: string;
}