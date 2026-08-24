import { AuditModel } from '../commons/audit-model';

export class LeaveRequestApprovalLevel extends AuditModel {
    id?: number;
    departmentId?: number;
    level?: number;
    designationId?: number;
    employeeCode?: string;
    employeeName?: string;
    status?: string;
}
