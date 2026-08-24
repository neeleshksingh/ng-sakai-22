export interface MonthlyLeaveReport {
    employeeCode: string;
    employeeName: string;
    department: string;
    casualLeave: number;
    earnedLeave: number;
    medicalLeave: number;
    leaveWithoutPay: number;
    totalLeave: number;
}