
import { BaseModel } from '../commons/base-model';
import { IdNameExpando } from '../commons/id-name';
import { StudentExaminationRegistration } from './student-examination-registration';

export class ExaminationProgramConfiguration extends BaseModel {
    examinationProgramConfigurationId?: number;
    examinationId?: number;
    academicSessionId?: number;
    programId?: number;
    operationalVerticalId?: number;
    paperTypeId?: number;
    subjectPaperCodeId?: number;
    examinationStartDateTime?: Date;
    examinationEndDateTime?: Date;
    marksEntryOpenDateTime?: Date;
    marksEntryCloseDateTime?: Date;
    isMarksEntryCompleted?: false;
}
export class StudentProgramPaperCodeAllocation extends BaseModel {
    operationalVerticalSubjectId?: number;
    academicSessionId?: number;
    programId?: number;
    operationalVerticalId?: number;
    studentId?: string;
    registrationNumber?: string;
    paperTypeId?: number;
    subjectTypeId?: number;
    subjectId?: number;
    subjectPaperCodeId?: number;

}
export class StudentBatchTransfer extends BaseModel {
    studentId?: string;
    registrationNumber?: string;
    subjectPaperCodeId?: number;
    batchTransferType?: number;
    fromBatchCode?: string;
    fromBatchLastCycleAttended?: string;
    toBatchCode?: string;
    toBatchCycleEntered?: string;
    isActive?: boolean;

}
export class StudentAcademicsReport {
    subjectPaperCodeName?: string;
    subjectName?: string;
    isAllocated?: boolean;
    allocationDate?: Date;
    batchCode?: string;
    examinationDateAndTime?: string;
    isRegistered?: boolean;
    registrationDate?: Date;
}

export class StudentAcademicReportResponse {
    studentExpandos?: IdNameExpando[];
    examinationProgramConfigurations?: ExaminationProgramConfiguration[];
    studentProgramPaperCodeAllocations?: StudentProgramPaperCodeAllocation[];
    studentBatchTransfers?: StudentBatchTransfer[];
    studentExaminationRegistrations?: StudentExaminationRegistration[];
    academicSessionExpandos?: IdNameExpando[];
    programExpandos?: IdNameExpando[];
    operationalVerticalExpandos?: IdNameExpando[];
    paperTypeExpandos?: IdNameExpando[];
    subjectTypeExpandos?: IdNameExpando[];
    subjectExpando?: IdNameExpando[];
    examinationExpandos?: IdNameExpando[];
    examinationTypeExpandos?: IdNameExpando[];
    subjectPaperCodeExpandos?: IdNameExpando[];
}