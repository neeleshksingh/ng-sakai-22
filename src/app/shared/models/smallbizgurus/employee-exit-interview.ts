import { AuditModel } from "../commons/audit-model";

export class EmployeeExitInterview extends AuditModel {
    feedbackCollection?: string;
    improvements?: string;
    neutralEnvironment?: string;
}