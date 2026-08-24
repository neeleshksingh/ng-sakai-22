export interface EmployeeLeaveRegisterReport {
    employeeCode: string;
    employeeName: string;
    department: string;
    designation: string;
    leaveType: string;
    fromDate: Date | string;
    toDate: Date | string;
    leaveDays: number;
    isHalfDay: boolean;
    status: string;
    approvedBy: string;
    approvedOn: Date | string | null;
    remarks: string;
}