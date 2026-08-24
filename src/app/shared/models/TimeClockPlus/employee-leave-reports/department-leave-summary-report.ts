export interface DepartmentLeaveSummary {
    department: string;
    totalEmployees: number;
    onLeaveToday: number;
    approved: number;
    pending: number;
    rejected: number;
    cancelled: number;
}