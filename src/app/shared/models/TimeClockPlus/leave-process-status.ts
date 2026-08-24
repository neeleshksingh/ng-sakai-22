import { BaseModel } from "../commons/base-model";

export class LeaveProcessStatus extends BaseModel{
    leaveYearId?: number;
    leaveYearName?: string;
    month?: number;
    monthName? : string;
    isProcessed?: Boolean = true;
    processDate?:Date;
}
