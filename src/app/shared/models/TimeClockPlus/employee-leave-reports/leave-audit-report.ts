export interface LeaveAuditReport {
    actionDate: Date | string;
    employeeCode: string;
    employeeName: string;
    action: string;
    performedBy: string;
    remarks: string;
}