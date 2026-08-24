import { BaseModel } from "../commons/base-model";

export class EmployeeLeavePolicyMapping extends BaseModel {
    employeeCode?: string;
    leaveYearId?: number;
    leaveSchemeId?: any;
    leaveTypeId?: number[];
    leavePolicyId?: any;
    startDate?: Date;
    endDate?: Date;
    employeeName?: string;

    leaveSchemeName?: string;
    leaveTypeName?: string;
    leavePolicyName?: string;
    leaveYearName?: string;
    dateOfJoining?: Date;
}

export class EmployeeLeavePolicyMappingData extends BaseModel{
    employeeCode?: string;
    dateOfJoining?: Date;

    leaveYearId?: number;
    leaveSchemeId?: number;
    leaveTypeId?: number[];
    leavePolicyId?: number[];
    startDate?: Date;
    endDate?: Date;

    leaveSchemeName?: string;
    leaveTypeName?: string[];
    leavePolicyName?: string[];
    leaveYearName?: string;
}