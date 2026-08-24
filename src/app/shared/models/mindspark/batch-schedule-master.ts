import { BaseModel } from "../commons/base-model";

export class BatchScheduleMaster extends BaseModel{
    monday?: string;
    tuesday?: string;
    wednesday?: string;
    thursday?: string;
    friday?: string;
    saturday?: string;
    sunday?: string;
    isMonday?: boolean;
    isTuesday?: boolean;
    isWednesday?: boolean;
    isThursday?: boolean;
    isFriday?: boolean;
    isSaturday?: boolean;
    isSunday?: boolean;
}