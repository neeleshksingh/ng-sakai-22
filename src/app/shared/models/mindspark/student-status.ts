import { AuditModel } from "../commons/audit-model";

export class StudentStatus extends AuditModel {
    id?: number;
    academicSessionId?: number;
    academicSessionName?: string;
    programId?: number;
    programName?: string;
    operationalVerticalId?: number;
    operationalVerticalName?: string;
    studentName?: string;
    studentId?: string;
    documentUrl?: string;
    registrationNumber?: string;
    studentStatusDescriptionId?: number;
    studentStatusDescriptionName: string = '';
    statusDescription?: string;
    startDate?: string;
    description?: string;
    endDate?: string;
    requestedDate?:Date | string;
    approveedDate?: Date | string;
    isRestore?: Boolean;
    restoreDate?: string;
    restoreDescription?: string;
    restoreBy?: string;
    status?: string;
}