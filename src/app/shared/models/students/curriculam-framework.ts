import { SubjectPaperCodeModuleSubModule } from "../cloudbytes/subject-paper-code-module-sub-module";
import { BaseModel } from "../commons/base-model";

export class CurriculumFramework extends BaseModel {
    academicSessionId!:number
    academicSessionName!: string
    programId!: number
    programName!: string
    operationalVerticalId!: number
    operationalVerticalName!: string
    programSpecializationName!:string
    subjectTypeName!:string
    subjectName!:string
    paperTypeName!: string
    subjectPaperCodeName!:string
    academicSessionProgramId!: number
    programSpecializationId!: number
    subjectTypeId!: number
    subjectId!: number
    paperTypeId!: number
    subjectPaperCodeId!: number
    version!:string
    creditUnit!: number
   
}
export class SubjectPaperCodeModuleSubModuleExpando extends BaseModel{
    subjectPaperCodeModuleSubModuleResponseList?: SubjectPaperCodeModuleSubModule[];
    subjectPaperCodeId?: number;
    version?: string;
}