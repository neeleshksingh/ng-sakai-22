import { BaseModel } from "../commons/base-model";
import { IdNameExpando } from "../commons/id-name";

export class ExaminationProgram  extends BaseModel{
    academicSessionId?: number;
    academicSessionName?: string;
    programId?: number;
    programName?: string;
    operationalVerticalId?: number;
    operationalVerticalName?: string;
    examinationId?: number;
    examinationName?: string;
    examinationTypeId?: number;
    examinationTypeName?: string;
    examinationFormOpenDateTime?: string;
    examinationFormCloseDateTime?: string;
    sequenceNumber?:number;
}
export class ExaminationProgramsResponse {
    examinationExpandos?: IdNameExpando[];
    academicSessionExpandos?: IdNameExpando[];
    programExpandos?: IdNameExpando[];
    operationalVerticalExpandos?: IdNameExpando[];
    examinationPrograms?: ExaminationProgram[];
}