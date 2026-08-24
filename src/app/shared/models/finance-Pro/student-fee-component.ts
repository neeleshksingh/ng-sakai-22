import { BaseModel } from "../commons/base-model";

export class StudentFeeComponent extends BaseModel {
    academicSessionId?: number;
    programId?: number;
    operationalVerticalId?: number;
    feeComponentId?: number;
    effectiveFrom?: Date;
    generalFee?: number;
    obcFee?: number;
    stscFee?: number;
    feeMode?: number;
    isAdjustmentAllowed?: boolean;
    canStudentAdjust?: boolean;
    academicSessionName?: string;
    programName?: string;
    operationalVerticalName?: string;
    feeComponentName?: string;
}