export interface LeaveWithoutPayReport {
    employeeCode: string;
    employeeName: string;
    department: string;
    fromDate: Date | string;
    toDate: Date | string;
    days: number;
    salaryDeduction: number;
}