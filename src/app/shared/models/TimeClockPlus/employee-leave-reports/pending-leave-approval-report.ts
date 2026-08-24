export interface PendingLeaveApprovalReport {
    requestNumber: string;
    employeeCode: string;
    employeeName: string;
    department: string;
    leaveType: string;
    appliedOn: Date | string;
    leaveDays: number;
    pendingWith: string;
    pendingLevel: number;
}