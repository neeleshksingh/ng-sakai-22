import { BaseModel } from "../commons/base-model";

export class ExaminationResultHold  extends BaseModel{
   
    academicSessionId?: number;
    programId?: number;
    operationalVerticalId?: number;
    examinationId?: number;
    examinationTypeId?: number;
    examinationTypeName?: string;
    programName?: string;
    operationalVerticalName?: string;
    examinationName?: string;
    academicSessionName?: string;
    registrationNumber?: string;
    isHold?: boolean;
    reason?: string;
}

export class ExaminationResultHoldRequestSearch {
    academicSessionId?: number;
    programId?: number;
    operationalVerticalId?: number;
    examinationId?: number;
    examinationTypeId?: number;
}