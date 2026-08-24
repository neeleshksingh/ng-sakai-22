import { AuditModel } from "../commons/audit-model";

export class StudentProgramSubjectSectionAllocation extends AuditModel
 {
    id?: number;
    AcademicSessionId?: number;
    ProgramId?:number;
    OperationalVerticalId?: number;
    SubjectId?: number;
    SubjectPaperCodeId?: number;
    registrationNumber?: string;
    section?: string;
    status?: string
 }
