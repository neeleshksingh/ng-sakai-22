import { BaseModel } from "../commons/base-model";
export class StudentConcessionCategoryFeeSetup extends BaseModel {
    academicSessionId?: number;
    academicSessionName?: string;
    programId?: number;
    programName?: string;
    operationalVerticalId?: number;
    operationalVerticalName?: string;
    studentId?: string;
    studentName?: string;
    registrationNumber?: string;
    feeComponentId?: number;
    feeComponentName?: string;
    isSpecificConcession?: true;
    concessionCategoryId?: number;
    concessionCategoryName?: string;
    concessionUnit?: string;
    concessionValue?: number;
    concessionAmount?: number;
    finalConcessionAmount?: number;
    isSyncedToStudentFeeMaster?: boolean;
}
export class AcademicSessionExpando extends BaseModel {
}
export class ProgramExpando extends BaseModel {
    academicSessionId?: number;
}
export class OperationalVerticalExpando extends BaseModel{
}
export class ConcessionCategoryExpando extends BaseModel {
}
export class FeeComponentExpando extends BaseModel {
}
export class StudentExpando {
    studentId?: string;
    registrationNumber?: string;
    studentName?: string;
    rollNumber?: string;
}
export class StudentConcessionCategoryFeeSetupSearchResponse {
    studentConcessionCategoryFeeSetupList?: StudentConcessionCategoryFeeSetup[];
    academicSessionExpandoList?: AcademicSessionExpando[];
    programExpandoList?: ProgramExpando[];
    operationalVerticalExpandoList?: OperationalVerticalExpando[];
    concessionCategoryExpandoList?: ConcessionCategoryExpando[];
    feeComponentExpandoList?: FeeComponentExpando[];
    studentExpandoList?: StudentExpando[];
}
export class StudentConcessionCategoryFeeSetupPagedData {
    currentPage?: number;
    totalPages?: number;
    pageSize?: number;
    totalCount?: number;
    hasPrevious?: boolean;
    hasNext?: boolean;
    itemsCount?: number;
    items?: StudentConcessionCategoryFeeSetup[];
}