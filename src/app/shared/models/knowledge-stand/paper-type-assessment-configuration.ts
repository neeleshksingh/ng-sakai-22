import { BaseModel } from "../commons/base-model";

export class PaperTypeAssessmentConfiguration extends BaseModel {
    academicSessionName?: string;
    examinationName?: string;
    programName?: string;
    operationalVerticalName?: string;
    paperTypeName?: string;
    examinationTypeName?: string;
    assessmentTypeName?: string;
    assessmentComponentName?: string;
    examinationProgramId?: number;
    examinationId?:number;
    academicSessionId?: number;
    programId?: number;
    operationalVerticalId?: number;
    paperTypeId?: number;
    examinationTypeId?: number;
    assessmentTypeId?: number;
    assessmentComponentId?: number;
    marksToBeExamined?: number;
    marksToBeCalculated?: number;
   
}