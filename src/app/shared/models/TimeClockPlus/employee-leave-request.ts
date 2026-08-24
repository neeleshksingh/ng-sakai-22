import { BaseModel } from "../commons/base-model";

export class EmployeeLeaveRequest extends BaseModel {
    requestDate?: Date;
    requestBy?: string;
    employeeCode?: string;
    employeeName?: string;
    leaveYearId?: number;
    leaveTypeId?: number;
    leaveTypeName?: string;
    startDate?: Date;
    isStartDateHalfDay?: boolean;
    endDate?: Date;
    isEndDateHalfDay?: boolean;
    noOfDays?: number;
    address?: string;
    phoneNumber?: string;
    leaveStatus?: string;
    type?: string;
    leaveRequestTeachingWorkAssignments?: LeaveRequestTeachingWorkAssignment[];
    leaveRequestNonTeachingWorkAssignments?: LeaveRequestNonTeachingWorkAssignment[];
    leaveRequestWorkFlows?: LeaveRequestWorkFlow[];
}

export class LeaveRequestTeachingWorkAssignment extends BaseModel {
    employeeLeaveRequestId?: number;
    scheduleDate?: Date | string;
    academicSessionId?: number;
    programId?: number;
    semesterId?: number;
    section?: string;
    period?: number;
    employeeCode?: string;
    employeeDisplay?: string;
    isAccepted?: boolean;
    acceptedDate?: Date;
    academicSessionName?: string;
    programName?: string;
    semesterName?: string;
    periodName?: string;
    employeeName?: string;
}

export class LeaveRequestNonTeachingWorkAssignment extends BaseModel {
    employeeLeaveRequestId?: number;
    scheduleDate?: Date | string;
    workDetails?: string;
    employeeCode?: string;
    employeeDisplay?: string;
    isAccepted?: boolean;
    acceptedDate?: Date;
}

export class LeaveRequestWorkFlow extends BaseModel {
    employeeLeaveRequestId?: number;
    departmentId?: number;
    level?: number;
    designationId?: number;
    employeeCode?: string;  // Approver's employee code
    leaveStatus?: string;
    comments?: string;
    departmentName?: string;
    designationName?: string;
    employeeName?: string;
}