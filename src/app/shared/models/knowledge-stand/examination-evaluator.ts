import { BaseModel } from "../commons/base-model";

export class ExaminationEvaluator extends BaseModel {
    examinationId?: number;
    academicSessionId?: number;
    programId?: number;
    operationalVerticalId?: number;
    paperTypeId?: number;
    subjectPaperCodeId?: number;
    facultyCode?: string;
    facultyName?:string;
    examinationEvaluatorBooklets?: ExaminationEvaluatorBooklet[];
}
export class ExaminationEvaluatorResponse extends ExaminationEvaluator  {
    examinationName?: string;
    academicSessionName?: string;
    programName?: string;
    operationalVerticalName?: string;
    paperTypeName?: string;
    subjectPaperCodeName?: string;
    subjectName?:string;
}
export class ExaminationEvaluatorBooklet extends BaseModel {
    examinationEvaluatorId?: number
    facultyCode?:string;
    facultyName?:string;
    batchCode?:string;
    decodeNumber?: number;
    isIssued?: boolean;
    issuedBy?: string;
    issueDateTime?: string;
    isReturned?: boolean;
    returnedBy?: string;
    returnedDateTime?: string;
    evaulationStatus?:string;

}
export class ExaminationEvaluatorBookletResponse extends ExaminationEvaluatorBooklet
{

}