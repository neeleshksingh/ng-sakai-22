import { AuditModel } from "../commons/audit-model";

export class FacultySubjectAllocation extends AuditModel {
    id?: number;
    employeeId?: number;
    employeeCode?: string;
    employeeName?: string;
    academicSessionId?: number;
    academicSessionName?: string;
    programId?: number;
    programName?: string;
    operationalVerticalId?: number;
    operationalVerticalName?: string;
    subjectPaperCodeId?: number;
    subjectPaperCodeName?: string;
    section?: string;
    subjectName?: string;
    status?: string;
}