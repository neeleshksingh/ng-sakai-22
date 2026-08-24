import { AuditModel } from "../commons/audit-model";

export class EmployeeLanguage extends AuditModel {
    id?: number;
    name?: string;
    canRead?: boolean;
    canWrite?: boolean;
    canSpeak?: boolean;
    employeeId?: number;
}