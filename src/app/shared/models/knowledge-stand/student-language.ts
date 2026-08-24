import { BaseModel } from "../commons/base-model";

export class StudentLanguage extends BaseModel {
    studentId?:string;
    canRead?: boolean;
    canWrite?: boolean;
    canSpeak?: boolean;

}