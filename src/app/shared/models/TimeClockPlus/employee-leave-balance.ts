import { AuditModel } from "../commons/audit-model";

export class EmployeeLeaveBalance extends AuditModel {
    leaveYearName?: string;
    leaveSchemeName?: string;
    leaveTypeName?: string;
    id?: number;
    employeeCode?: string;
    leaveYearId?: number;
    leaveSchemeId?: number;
    leaveTypeId?: number;
    outstandingBalance?: number;
    granted?: number;
    applied?: number;
    cancelled?: number;
    rejected?: number;
    availed?: number;
    leaveDeducted?: number;
    lapsed?: number;
    balance?: number;
    status?: string;
}
