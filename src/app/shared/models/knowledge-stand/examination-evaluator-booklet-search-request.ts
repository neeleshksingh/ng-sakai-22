import { BaseModel } from "../commons/base-model";
export class ExaminationEvaluatorBookletSearchRequest extends BaseModel
{
        examinationId?:number;
        academicSessionId?:number;
        programId?:number;
        operationalVerticalId?:number;
        subjectPaperCodeId?:number;
        facultyCode?:string;
        evauluationStatus ?:string;
        isIssued?:boolean;
        isReturned ?:boolean;
        
}