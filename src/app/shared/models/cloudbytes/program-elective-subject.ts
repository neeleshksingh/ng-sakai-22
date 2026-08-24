import { AuditModel } from "../commons/audit-model";

export class ProgramElectiveSubject extends AuditModel {
    id?: number;
    programId?: number;
    semesterId?: number;
    subjectId?: number;
    subjectPaperCodeId?: number;
    status?: string;
}

export class ProgramElectiveSubjectResponse extends ProgramElectiveSubject {
    programName?: string;
    semesterName?: string;
    subjectName?: string;
    subjectPaperCodeName?: string;
}