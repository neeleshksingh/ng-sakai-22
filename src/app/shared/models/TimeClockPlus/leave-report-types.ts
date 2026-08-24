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

export interface DepartmentLeaveSummary {
    department: string;
    totalEmployees: number;
    onLeaveToday: number;
    approved: number;
    pending: number;
    rejected: number;
    cancelled: number;
}

export interface DailyLeaveReport {
    date: Date | string;
    employeeCode: string;
    employeeName: string;
    department: string;
    leaveType: string;
    isHalfDay: boolean;
    contactNumber: string;
}

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

export interface PendingLeaveApprovalReport {
    requestNumber: string;
    employeeCode: string;
    employeeName: string;
    department: string;
    leaveType: string;
    appliedOn: Date | string;
    leaveDays: number;
    pendingWith: string;
    pendingLevel: number;
}

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

export interface LeaveEncashmentReport {
    employeeCode: string;
    employeeName: string;
    leaveBalance: number;
    encashedDays: number;
    amount: number;
    encashmentDate: Date | string;
}

export interface LeaveWithoutPayReport {
    employeeCode: string;
    employeeName: string;
    department: string;
    fromDate: Date | string;
    toDate: Date | string;
    days: number;
    salaryDeduction: number;
}

export interface FacultyAvailabilityReport {
    date: Date | string;
    employeeCode: string;
    facultyName: string;
    department: string;
    isPresent: boolean;
    isOnLeave: boolean;
    substituteFaculty: string;
}

export interface LeaveTrendReport {
    month: string;
    casualLeave: number;
    earnedLeave: number;
    medicalLeave: number;
    leaveWithoutPay: number;
    total: number;
}

export interface LeaveTypeUtilizationReport {
    leaveType: string;
    allocated: number;
    used: number;
    remaining: number;
}

export interface AttendanceVsLeaveReport {
    employeeCode: string;
    employeeName: string;
    workingDays: number;
    presentDays: number;
    leaveDays: number;
    leaveWithoutPay: number;
    attendancePercentage: number;
}

export interface HolidayLeaveClashReport {
    employeeCode: string;
    employeeName: string;
    leaveFromDate: Date | string;
    leaveToDate: Date | string;
    holidayName: string;
    actualLeaveCount: number;
}

export interface LeaveAuditReport {
    actionDate: Date | string;
    employeeCode: string;
    employeeName: string;
    action: string;
    performedBy: string;
    remarks: string;
}

export interface LeaveLiabilityReport {
    employeeCode: string;
    employeeName: string;
    earnedLeaveBalance: number;
    encashableDays: number;
    liabilityAmount: number;
}

export interface LeaveDashboardReport {
    totalEmployees: number;
    employeesOnLeaveToday: number;
    pendingApprovals: number;
    approvedThisMonth: number;
    rejectedThisMonth: number;
    leaveBalanceAlerts: number;
    attendancePercentage: number;
    departmentWiseLeave: DepartmentLeaveSummary[];
    leaveTrend: LeaveTrendReport[];
    leaveTypeUtilization: LeaveTypeUtilizationReport[];
}

export type LeaveReportType =
    | EmployeeLeaveRegisterReport
    | LeaveBalanceReport
    | DepartmentLeaveSummary
    | DailyLeaveReport
    | MonthlyLeaveReport
    | PendingLeaveApprovalReport
    | LeaveCancellationReport
    | LeaveEncashmentReport
    | LeaveWithoutPayReport
    | FacultyAvailabilityReport
    | LeaveTrendReport
    | LeaveTypeUtilizationReport
    | AttendanceVsLeaveReport
    | HolidayLeaveClashReport
    | LeaveAuditReport
    | LeaveLiabilityReport;
