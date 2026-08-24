export interface LeaveBalanceReport {
    employeeCode: string;
    employeeName: string;
    department: string;
    casualLeave: number;
    earnedLeave: number;
    medicalLeave: number;
    maternityLeave: number;
    leaveWithoutPay: number;
    compOff: number;
    totalBalance: number;
}