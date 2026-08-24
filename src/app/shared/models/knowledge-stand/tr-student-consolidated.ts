import { AuditModel } from "../commons/audit-model";

export class TrStudentConsolidated extends AuditModel {
    id?: number;
    trStudentId?: number;
    examinationId?: number;
    academicSessionId?: number;
    programId?: number;
    operationalVerticalId?: number;
    registrationNumber?: string;
    obtainedMarks?: number;
    totalMarks?: number;
    backlogCount?: number;
    sgpa?: number;
    cgpa?: number;
    result?: string;
    regCredit?: number;
    totalGradePoint?: number;
    earnCredits?: number;
    egp?: number;
    status?: string;
}

export class TrStudentConsolidatedResponse extends TrStudentConsolidated {
    programName?: string;
    percentage?: number;
    academicSessionName?: string;
    operationalVerticalName?: string;
    examinationName?: string;
}