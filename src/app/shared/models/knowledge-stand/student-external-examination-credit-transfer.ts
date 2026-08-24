import { AuditModel } from "../commons/audit-model";

export class StudentExternalExaminationCreditTransfer extends AuditModel {
    id?: number;
    externalExamination?: string;
    internalExaminationId?: number;
    academicSessionId?: number;
    programId?: number;
    semesterId?: number;
    registrationNumber?: string;
    subjectId?: number;
    subjectPaperCodeId?: number;
    obtainedMarks?: number;
    symbol?: string;
    source?: string;
    status?: string;
}

export class StudentExternalExaminationCreditTransferResponse extends StudentExternalExaminationCreditTransfer {
    internalExaminationName?: string;
    academicSessionName?: string;
    programName?: string;
    semesterName?: string;
    studentName?: string;
    subjectName?: string;
    subjectPaperCodeName?: string;
}