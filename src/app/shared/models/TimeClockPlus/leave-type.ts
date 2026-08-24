import { BaseModel } from "../commons/base-model";

export class LeaveType extends BaseModel{
    leaveTypeCode?: string;
    applicableGender?: string;
    applicableMaritalStatus? : string;
}