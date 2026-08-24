import { BaseModel } from "../commons/base-model";

export class SubjectPaperCodeModuleSubModule extends BaseModel {
    subjectPaperCodeId?: number;
    subjectPaperCodeModuleId?: number;
    subjectPaperCodeModuleName?: string;
    durationInMinute?: number;
    cycle?: string;
}