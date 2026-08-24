import { BaseModel } from "../commons/base-model";

export class ExaminationTRJobRequest extends BaseModel {
    jobTypeId?: number;
    parameters?: string;
    isNeedToStartImmediately?: boolean;
    scheduleStartDateTime?: Date
    startDateTime?: Date
    endDateTime?: Date
    jobStatusId?: number;
    jobFailedReason?: string;
    sequenceNumber?: number;
    items?:any
}