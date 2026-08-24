import { BaseModel } from "../commons/base-model";

export class ExaminationMarksEntryLockStatusStudent extends BaseModel {
    examinationMarksEntryLockStatusId?: number;
    registrationNumber?: string;
    decodeNumber?: number;
   
}

export class ExaminationMarksEntryLockStatusStudentComponentWise extends ExaminationMarksEntryLockStatusStudent {
    componentId?: number;
    batchCode?: string;
}