export interface LeaveCancellationReport {
    cancellationNumber: string;
    employeeCode: string;
    employeeName: string;
    leaveType: string;
    fromDate: Date | string;
    toDate: Date | string;
    cancelledOn: Date | string;
    status: string;
}