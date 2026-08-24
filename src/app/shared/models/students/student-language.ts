import { AuditModel } from "../commons/audit-model";

export class StudentLanguage extends AuditModel{
    id?: number;
    studentId?:string;
    name?: string;
    canRead?: boolean;
    canWrite?: boolean;
    canSpeak?: boolean;
}