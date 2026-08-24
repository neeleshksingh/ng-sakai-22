import { BaseModel } from "../commons/base-model";

export class LeaveGrantJobStatus extends BaseModel{
    leaveYearId?:number;
    leaveYearName?:string;
    month?:number;
    monthName?:string;
    isProcessed?:boolean;
    processedBy?:string;
    processDate?: Date;
}