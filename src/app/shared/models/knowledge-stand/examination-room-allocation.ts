import { AcademicSession } from "../cloudbytes/academic-session";
import { OperationalVertical } from "../cloudbytes/operational-vertical";
import { PaperType } from "../cloudbytes/paper-type";
import { Program } from "../cloudbytes/program";
import { BaseModel } from "../commons/base-model";
import { StudentProgram } from "../mindspark/student-program";
import { AssessmentComponent } from "./assessment-component";
import { AssessmentType } from "./assessment-type";
import { Examination } from "./examination";
import { ExaminationProgram } from "./examination-program";
import { ExaminationProgramConfigurationData } from "./examination-program-configuration";
import { ExaminationSeatingArrangement } from "./examination-seating-arrangement.";
import { ExaminationType } from "./examination-type";
import { PaperTypeAssessmentConfiguration } from "./paper-type-assessment-configuration";
import { StudentExaminationRegistration } from "./student-examination-registration";
import { SubjectPaperCode } from "./subject-paper-code";

export class ExaminationSeatingArrangementRequest {
    serialSequance?: number;
    buildingId?: number;
    roomId?: number;
    roomAllocationGroupId?: number;
    examinationStartDateTime?: string;
    examinationEndDateTime?: string;
    examinationId?: number;
    examinationProgramId?: number;
    paperTypeAssessmentConfigurationId?: number;
    examinationProgramConfigurationId?: number;
    examinationSeatingPatternId?: number;
    numberOfStudents?: number;
    isExaminationSeatingArrangementGenerated?: boolean;
    status?: string;
    columnSequencesData?: string;
    columnSequences?: number[];

    // below fileds add for filteration of duplicate record
    academicSessionId?: number;
    academicSessionName?: string;
    programId?: number;
    programName?: string;
    operationalVerticalId?: number;
    operationalVerticalName?: string;
    subjectPaperCodeId?: number;
    subjectPaperCodeName?: string;
    paperTypeId?: number;
    paperTypeName?: string;
    examinationTypeId?: number;
    examinationTypeName?: string;
    assessmentTypeId?: number;
    assessmentTypeName?: string;
    assessmentComponentId?: number;
    assessmentComponentName?: string;


}
export class ExaminationSeatingArrangementData {
    examinationSeatingArrangements?: ExaminationSeatingArrangement[];
    studentExaminationRegistrations?: StudentExaminationRegistration[];
    academicSessions?: AcademicSession[];
    programs?: Program[];
    operationalVerticals?: OperationalVertical[];
    paperTypes?: PaperType[];
    examinationTypes?: ExaminationType[];
    assessmentTypes?: AssessmentType[];
    assessmentComponents?: AssessmentComponent[];
    examinations?: Examination[];
    examinationPrograms?: ExaminationProgram[];
    examinationProgramConfigurations?: ExaminationProgramConfigurationData[];
    subjectPaperCodes?: SubjectPaperCode[];
    paperTypeAssessmentConfigurations?: PaperTypeAssessmentConfiguration;
    studentPrograms?: StudentProgram[];
    examinationRoomAllocations?: ExaminationRoomAllocation[];
}

export class ExaminationRoomAllocation extends BaseModel {
    buildingId?: number;
    roomId?: number;
    roomAllocationGroupId?: number;
    examinationStartDateTime?: Date;
    examinationEndDateTime?: Date;
    examinationId?: number;
    examinationProgramId?: number;
    paperTypeAssessmentConfigurationId?: number;
    examinationProgramConfigurationId?: number;
    examinationSeatingPatternId?: number;
    numberOfStudents?: number;
    isExaminationSeatingArrangementGenerated?: boolean;
    columnSequencesData?: string;

    examinationName?: string
    academicSessionId?: number;
    programId?: number;
    operationalVerticalId?: number;
    buildingName?: string;
    floorNumber?: number;
    roomNumber?: string;
    ExaminationProgramName?: string
    subjectName?: string;
    subjectPaperCodeId?: number;
    subjectPaperCodeName?: string;
    paperTypeId?: number
    paperTypeName?: string
    examinationTypeId?: number
    examinationTypeName?: string
    assessmentTypeId?: number
    assessmentTypeName?: string
    assessmentComponentId?: number
    assessmentComponentName?: string
    examinationSeatingPatternName?: string
}