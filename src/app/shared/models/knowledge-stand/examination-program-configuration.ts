import { BaseModel } from "../commons/base-model";
import { IdNameExpando } from "../commons/id-name";

export class ExaminationProgramConfigurationResponse extends BaseModel {
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
    programSpecializationName?: string;
    programSpecializationId?: number;
    examinationTypeId?: number;
    examinationTypeName?: string;
    examinationName?: string;
    academicSessionName?: string;
    programName?: string;
    operationalVerticalName?: string;
    subjectId?: number;
    subjectName?: string;
    subjectPaperCodeName?: string;
    paperTypeName?: string;
   
}
export class ExaminationProgramConfigurationData extends BaseModel {
    examinationProgramConfigurationId?: number;
    examinationId?: number;
    academicSessionId?: number;
    programId?: number;
    operationalVerticalId?: number;
    paperTypeId?: number;
    subjectPaperCodeId?: number;
    examinationStartDateTime?: string;
    examinationEndDateTime?: string;
    marksEntryOpenDateTime?: string;
    marksEntryCloseDateTime?: string;
    programSpecializationName?: string;
    programSpecializationId?: number;
    examinationTypeId?: number;
    examinationTypeName?: string;
    examinationName?: string;
    academicSessionName?: string;
    programName?: string;
    operationalVerticalName?: string;
    subjectId?: number;
    subjectName?: string;
    subjectPaperCodeName?: string;
    paperTypeName?: string;
}

export class ExaminationProgramConfigurationPagedData {
    currentPage?: number;
    totalPages?: number;
    pageSize?: number;
    totalCount?: number;
    hasPrevious?: boolean;
    hasNext?: boolean;
    itemsCount?: number;
    items?: ExaminationProgramConfigurationData[];
}
export class ExaminationProgramConfigurationSearch {
    examinationIds?: number[];
    academicSessionIds?: number[];
    programIds?: number[];
    operationalVerticalIds?: number[];
}
export class ExaminationProgramConfigurationSearchResponse {
    examinationExpandos?: IdNameExpando[];
    academicSessionExpandos?: IdNameExpando[];
    programExpandos?: IdNameExpando[];
    operationalVerticalExpandos?: IdNameExpando[];
    paperTypeExpandos?: IdNameExpando[];
    subjectPaperCodeExpandos?: IdNameExpando[];
    examinationProgramConfigurations?: ExaminationProgramConfigurationResponse[];
}
