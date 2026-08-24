import { BaseModel } from "../commons/base-model";

export class LeaveYear extends BaseModel{
    startDate?: string;
    endDate?: string;
    isCurrentYear?: boolean;
}