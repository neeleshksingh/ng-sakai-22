import { BaseModel } from "../commons/base-model";

export enum FeeMode {
    YEARLY,
    HALFYEARLY,
    QUARTERLY,
    MONTHLY,
    ONETIME
}

export class OperationalVerticalFeeComponent extends BaseModel {
    academicSessionId?: number;
    academicSessionName?:string;
    programId?: number;
    programName?: string;
    operationalVerticalId?: number;
    operationalVerticalName?: string;
    feeComponentId?: 1;
    feeComponentName?:string;
    effectiveFrom?: string;
    generalFee?: number;
    obcFee?: number;
    stscFee?: number;
    feeMode?: FeeMode;
    feeModeName?: string;
}