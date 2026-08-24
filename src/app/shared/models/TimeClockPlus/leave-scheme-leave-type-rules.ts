import { BaseModel } from "../commons/base-model";

export class LeaveSchemeLeaveTypeRule extends BaseModel{
    leaveYearId?: number;
    leaveYearName ? :string;

    leaveSchemeId?: number;
    leaveSchemeName?:string;

    leaveTypeId?: number;
    leaveTypeName?:string;

    leavePolicyId?: number;
    leavePolicyName?:number;

    leavePeriodicityId?: number;
    leavePeriodicityName?:string;

    leaveCredit?: number;
    isSplitAllowed?:boolean;
    noOfDaysApplyBefore?: number;
    isLeaveRequestAllowedAfter?: boolean;
    noOfDaysApplyAfter?: number;
    isLeaveCarryForwardAllowed?: boolean;
    noOfMaxDaysToCarryForward?: number;
    isPayoutEnabled?: boolean;
    isPayoutRecoveryEnabled?: boolean;
    noOfDaysToResumeWork?: number;
}