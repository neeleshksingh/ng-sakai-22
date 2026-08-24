export interface DailyLeaveReport {
    date: Date | string;
    employeeCode: string;
    employeeName: string;
    department: string;
    leaveType: string;
    isHalfDay: boolean;
    contactNumber: string;
}