import { DepartmentLeaveSummary } from "./department-leave-summary-report";
import { LeaveTrendReport } from "./leave-trend-report";
import { LeaveTypeUtilizationReport } from "./leave-type-utilization-report";

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