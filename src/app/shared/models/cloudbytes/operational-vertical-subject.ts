import { AuditModel } from "../commons/audit-model";
import { IdNameExpando } from "../commons/id-name";

export class OperationalVerticalSubject extends AuditModel {
    id?: number;
    academicSessionProgramId?: number;
    academicSessionId?: number;
    academicSessionName?: string;
    programId?: number;
    programName?: string;
    operationalVerticalId?: number;
    operationalVerticalName?: string;
    programSpecializationId?: number;
    programSpecializationName?: string;
    subjectId?: number;
    subjectName?: string;
    subjectTypeId?: number;
    subjectTypeName?: string;
    paperTypeId?: number;
    paperTypeName?: string;
    subjectPaperCodeId?: number;
    subjectPaperCodeName?: string;
    version?: string;
    status?: string;
    creditUnit?: number;
}
export class OvSubjectSearch {
    academicSessionIds?: number[];
    programIds?: number[];
    operationalVerticalIds?: number[];
}
export class OperationalVerticalSubjectSearchResponse {
    operationalVerticalSubjects?: OperationalVerticalSubject[];
    academicSessionExpandos?: IdNameExpando[];
    programExpandos?: IdNameExpando[];
    operationalVerticalExpandos?: IdNameExpando[];
    paperTypeExpandos?: IdNameExpando[];
    subjectPaperCodeExpandos?: IdNameExpando[];
    subjectTypeExpandos?: IdNameExpando[];
    subjectExpandos?: IdNameExpando[];
    programSpecializationExpandos?: IdNameExpando[];
}