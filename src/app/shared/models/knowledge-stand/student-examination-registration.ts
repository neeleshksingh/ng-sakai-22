import { BaseModel } from "../commons/base-model";

export class StudentExaminationRegistration extends BaseModel {
    studentId?: string;
    registrationNumber?: string;
    academicSessionId?: number;
    programId?: number;
    operationalVerticalId?: number;
    subjectTypeId?: number;
    subjectTypeName?: string;
    subjectName?: string = "";
    subjectPaperCodeId?: number;
    subjectPaperCodeName?: string = "";
    examinationId?: number;
    examinationProgramId?: number;
    paperTypeAssessmentConfigurationId?: number;
    paperTypeId?: number;
    paperTypeName?: string = "";
    examinationTypeId?: number;
    assessmentTypeId?: number;
    assessmentComponentId?: number;
    totalMarks?: number;
    examinationProgramConfigurationId?: number;
    examinationFormOpenDateTime?: string;
    examinationFormCloseDateTime?: string;
    examinationStartDateTime?: string = "";
    examinationEndDateTime?: string = "";
    marksEntryOpenDateTime?: string = "";
    marksEntryCloseDateTime?: string = "";
    examinationName?: string = "";
    academicSessionName?: string = "";
    programName?: string = "";
    operationalVerticalName?: string = "";
    examinationTypeName?: string = "";
    batchCode?: string;
    isBackPaper?: boolean = false;
    resultStatus?: string = "Pending";
    paymentStatus?: string;
    paymentReferenceNumber?: string;
    submitDateTime?: string;
    isSeatAllocated?: boolean;
    rollNumber?: string;
}
export class GroupListStudentExaminationRegistration {
    examinationName?: string;
    programName?: string;
    operationalVerticalName?: string;
    examinationTypeName?: string;
    studentExaminationRegistration?: StudentExaminationRegistration[];
}

export class ExaminationRegistrationSearch {
    examinationId?: number;
    academicSessionId?: number;
    programId?: number;
    operationalVerticalId?: number;
}