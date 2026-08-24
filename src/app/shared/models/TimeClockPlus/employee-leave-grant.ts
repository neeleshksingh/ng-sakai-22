import { BaseModel } from "../commons/base-model";

export class EmployeeLeaveGrant extends BaseModel{
    year?: number;
    leaveYearName? : string;
    month?: number;
    leaveMonth?:string;
    leaveYearId?: number;
    leaveSchemeId?: number;
    leaveSchemeName?:string;
    leaveTypeId?: number;
    leaveTypeName?:string;
    leavePolicyId?: number;
    leavePolicyName?:string;
    leavePeriodicityId?: number;
    leavePeriodicityName?:string;
    leaveCredit?: number;
    isProcessed?: boolean;
}