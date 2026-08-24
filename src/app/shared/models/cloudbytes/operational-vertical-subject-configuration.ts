import { AuditModel } from "../commons/audit-model";

export class OperationalVerticalSubjectConfiguration extends AuditModel {
    id?: number;
    academicSessionId?: number;
    academicSessionName?: string;
    programId?: number;
    programName?: string;
    operationalVerticalId?: number;
    operationalVerticalName?: string;
    subjectTypeId?: number;
    subjectTypeName?: string;
    noOfPaperCodeOffered?: number;
    noOfPaperCodeAllowed?: number;
    status?: string;
    creditUnit?: number;
}