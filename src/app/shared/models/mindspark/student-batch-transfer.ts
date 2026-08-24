import { AuditModel } from "../commons/audit-model";

export class StudentBatchTransfer extends AuditModel {
    id?: number;
    studentId?: string;
    registrationNumber?: string;
    studentName?: string;
    batchTransferType?: number;
    fromBatchCode?: string;
    fromBatchLastCycleAttended?: string;
    toBatchCode?: string;
    toBatchCycleEntered?: string;
    isActive?: boolean;
    status?: string
    batchTransferTypeString?: string;
    subjectPaperCodeId?: number;
    subjectPaperCodeName?: string;
    fromBatchCurrentCycle?: string;
    toBatchCurrentCycle?: string;

    operationalVerticalId?: number;
    operationalVerticalName?: string;
}