import { BaseModel } from "../commons/base-model";
import { SubjectPaperCodeModuleSubModule } from "./subject-paper-code-module-sub-module";

export class SubjectPaperCodeModuleSubModuleExpando extends BaseModel{
    subjectPaperCodeModuleSubModuleResponseList?: SubjectPaperCodeModuleSubModule[];
    subjectPaperCodeId?: number;
    version?: string;
}