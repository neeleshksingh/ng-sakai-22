import { AuditModel } from "../commons/audit-model";

export class StudentPublishNotice extends AuditModel {
    id?: number;
    noticeId?: number;
    noticeType?: string;
    title?: string;
    academicSessionIds?: number[];
    programIds?: number[];
    operationalVerticalIds?: number[];
    studentIds?: string[];
    status?: string;
    
}
export class StudentNotice{
    id?: number;
    noticeId?: number;
    academicSessionId?: number;
    programId?: number;
    operationalVerticalId?: number;
    studentId?: string;
    status?: string;
}