import { AuditModel } from "../commons/audit-model";

export class OperationalVerticalSubject extends AuditModel {
    isSubjectPaperCodeSelected?: boolean=false;
    academicSessionId?: number;
    academicSessionName?: string;
    programId?: number;
    programName?: string;
    operationalVerticalId?: number;
    operationalVerticalName?: string;
    subjectTypeName?: string;
    subjectName?: string;
    paperTypeName?: string;
    subjectPaperCodeName?: string;
    id?: number;
    academicSessionProgramId?: number;
    subjectTypeId?: number;
    subjectId?: number;
    paperTypeId?: number;
    subjectPaperCodeId?: number;
    batchCode?: string;
    version?: string;
    creditUnit?: number;
    status?: string;
    subjectType?: SubjectType;
    isSelectionAllowedLabel?: boolean;
    isSelectionAllowed?: boolean;
    noOfSelection?: number=0;
    isSelected?: boolean;
}
export class SubjectType {
    id?: number;
    name?: string;
}