import { AuditModel } from "../commons/audit-model";
import { IdNameExpando } from "../commons/id-name";

export class StudentProgramPaperCodeAllocation extends AuditModel {

    id?: number;
    studentId?: string;
    registrationNumber?: string;
    academicSessionId?:number;
    academicSessionName?: string;
    programId?:number;
    programName?: string;
    studentName?: string;
    operationalVerticalId?: number;
    operationalVerticalName?: string;
    subjectId?:number;
    subjectName?: string;
    subjectTypeId?:number;
    subjectTypeName?: string;
    subjectPaperCodeId?: number;
    subjectPaperCodeName?: string;
    status?: string
   
    fromBatchCode?:string;
    toBatchCode?:string;

    noOfPaperCodeAllowed?:number;
    noOfPaperCodeSelected?:number
    operationalVerticalSubjectId?:number;
    paperTypeId?:number;
    toBatchCycleStarted?:string;
    toBatchCycleEntered?:string;
}
export class StudentProgramPaperCodeAllocationSearch {
    academicSessionIds?: number[];
    programIds?: number[];
    operationalVerticalIds?: number[];
    registrationNumbers?: string[];
}
export class StudentProgramPaperCodeAllocationSearchResponse {
    academicSessionExpandos?: IdNameExpando[];
    programExpandos?: IdNameExpando[];
    paperTypeExpandos?: IdNameExpando[];
    subjectPaperCodeExpandos?: IdNameExpando[];
    operationalVerticalExpandos?: IdNameExpando[];
    examinationExpandos?: IdNameExpando[];
    studentExpandos?: IdNameExpando[];
    subjectTypeExpandos?: IdNameExpando[];
    subjectExpandos?: IdNameExpando[];
    studentProgramPaperCodeAllocations?: StudentProgramPaperCodeAllocation[];
}