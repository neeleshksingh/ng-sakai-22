import { BaseModel } from "../commons/base-model";
import { ExaminationMarksEntryLockStatusStudent } from "./examination-marks-entry-lock-status-student";

export class ExaminationMarksEntryLockStatus extends BaseModel {
    examinationId?: number;
    academicSessionId?: number;
    programId?: number;
    operationalVerticalId?: number;
    paperTypeId?: number;
    subjectTypeId?: number;
    subjectId?: number;
    subjectPaperCodeId?: number;
    batchCode?: string;
    assessmentTypeId?: number;
    assessmentComponentId?: number;
    lockStatus?: boolean;
    lockStatusUpdatedBy?: string;
    lockStatusUpdatedDateTime?: Date;
    isInternal?: boolean;
    isExternal?: boolean;
    examinationMarksEntryLockStatusStudentList?: ExaminationMarksEntryLockStatusStudent[];
}

export class ExaminationBatchCodeUnlockStatus {
    batchCode?: string;
    isEnableAllBatchStudent?: boolean;
    studentPercentage?: number;
}

export class ExaminationMarksEntryLockStatusResponse extends ExaminationMarksEntryLockStatus {
    examinationName?: string;
    academicSessionName?: string;
    programName?: string;
    operationalVerticalName?: string;
    paperTypeName?: string;
    subjectTypeName?: string;
    subjectName?: string;
    subjectPaperCodeName?: string;
    assessmentTypeName?: string;
    assessmentComponentName?: string;
}

export class ExaminationMarksEntryAcademicSession
{
    academicSessionName?:string;
    academicSessionId?: number;
}
export class ExaminationMarksEntryLockStatusList{
    examinationMarksEntryAcademicSession?:ExaminationMarksEntryAcademicSession;
    programName?: string;
    operationalVerticalName?: string;
    paperTypeName?: string;
    subjectTypeName?: string;
    subjectName?: string;
    subjectPaperCodeName?: string;
    batchCode?:string;
    assessmentTypeName?: string;
    assessmentComponentName?: string;
    lockStatus?:boolean;
}
