import { BaseModel } from "../commons/base-model";

export class ExaminationMarksEntry extends BaseModel {
    examinationAttendanceId?: number;
    examinationProgramConfigurationId?: number;
    examinationId?: number;
    examinationProgramId?: number;
    academicSessionId?: number;
    programId?: number;
    operationalVerticalId?: number;
    subjectTypeId?: number;
    subjectId?: number;
    subjectPaperCodeId?: number;
    batchCode?: string;
    section?: string;
    paperTypeAssessmentConfigurationId?: number;
    paperTypeId?: number;
    examinationTypeId?: number;
    assessmentTypeId?: number;
    assessmentComponentId?: number;
    registrationNumber?: string;
    bookletNumber?: number;
    decodeNumber?: number;
    totalMarks?: number;
    obtainedMarks?: number;
    isLocked?: boolean;
    lockedBy?: string;
    lockedDateTime?: Date;
    isInternal?: boolean
    isExternal?: boolean;
}

export class ExaminationMarksEntryRequest {
    examinationId?: number;
    academicSessionId?: number;
    programId?: number;
    operationalVerticalId?: number;
    subjectPaperCodeId?: number;
    batchCode?: string;
    assessmentTypeId?: number;
    assessmentComponentId?: number;
}
export class ExaminationMarksEntryResponse extends ExaminationMarksEntry {
    subjectTypeName?: string;
    examinationName?: string;
    academicSessionName?: string;
    programName?: string;
    operationalVerticalName?: string;
    subjectName?: string;
    subjectPaperCodeName?: string;
    paperTypeName?: string;
    examinationTypeName?: string;
    assessmentTypeName?: string;
    assessmentComponentName?: string;
    studentName?: string;
    studentList?: StudentList[];
}


export class AssessmentComponentList {
    assessmentComponentId: number=0;
    assessmentComponentName?: string;
    marksToBeExamined?: number;
    obtainedMarks?: number;
    isLocked?: boolean;
    lockedBy?: string;
    lockedDateTime?: string;
    status?: string;
}
export class AssessmentTypeList {
    assessmentTypeId: number=0;
    assessmentTypeName?: string;
    assessmentComponentList: AssessmentComponentList[] = [];
}
export class StudentList {
    [key: string]: any;
    batchCode?: string;
    registrationNumber?: string;
    studentName?: string;
    decodeNumber?: number;
    bookletNumber?: string;
    isUnlockAvailable?: boolean = false;
    assessmentTypeList: AssessmentTypeList[] = [];
    status?: string;
    examinationAttendanceId?: number;
    isPresent?: boolean;
    disableControl?: boolean;
    totalMarks?: number;
    section?: string;
}
export class ExaminationMarksEntryResponseWithFileUrl {
    fileUrl?: string;
    result?: ExaminationMarksEntryResponse
}