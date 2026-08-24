export interface HolidayLeaveClashReport {
    employeeCode: string;
    employeeName: string;
    leaveFromDate: Date | string;
    leaveToDate: Date | string;
    holidayName: string;
    actualLeaveCount: number;
}