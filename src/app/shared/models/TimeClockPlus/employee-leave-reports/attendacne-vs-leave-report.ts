export interface AttendanceVsLeaveReport {
    employeeCode: string;
    employeeName: string;
    workingDays: number;
    presentDays: number;
    leaveDays: number;
    leaveWithoutPay: number;
    attendancePercentage: number;
}