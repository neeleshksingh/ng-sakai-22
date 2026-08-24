export interface LeaveEncashmentReport {
    employeeCode: string;
    employeeName: string;
    leaveBalance: number;
    encashedDays: number;
    amount: number;
    encashmentDate: Date | string;
}