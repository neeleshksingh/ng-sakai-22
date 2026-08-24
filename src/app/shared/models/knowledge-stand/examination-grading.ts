import { BaseModel } from "../commons/base-model";
import { IdNameExpando } from "../commons/id-name";


export class ExaminationGrading extends BaseModel {
    [x: string]: any;
    degreeTypeId?: number;
    degreeTypeName?: string;
    academicSessionId?: number;
    academicSessionName?: string;
    programId?: number;
    programName?: string;
    operationalVerticalId?: number;
    operationalVerticalName?: string;
    percentageRangeFrom?: number;
    percentageRangeTo?: number;
    grade?: string;
    performanceLevel?: string;
    gradePoint?: number;
    gradeDisplayText?: string;
    paperTypeId?: number;
    paperTypeName?: string;
}
export class ExaminationGradingSearchResponse {
    examinationGradings?: ExaminationGrading[];
    academicSessionExpandos?: IdNameExpando[];
    programExpandos?: IdNameExpando[];
    operationalVerticalExpandos?: IdNameExpando[];
    degreeTypeExpandos?: IdNameExpando[];
    paperTypeExpandos?: IdNameExpando[];
}

export class ExaminationGradingPagedData {
    currentPage?: number;
    totalPages?: number;
    pageSize?: number;
    totalCount?: number;
    hasPrevious?: boolean;
    hasNext?: boolean;
    itemsCount?: number;
    items?: ExaminationGrading[];
}

export class ExaminationGradingRequest {
    degreeTypeId?: number;
    academicSessionIds?: number[];
    paperTypeId?: number;
    gradingLevels?: GradingLevel[]

}

export class GradingLevel  extends BaseModel{
    slNumber?:number;
    percentageRangeFrom?: number;
    percentageRangeTo?: number;
    grade?: string;
    performanceLevel?: string;
    gradePoint?: number;
    gradeDisplayText?: string;
}