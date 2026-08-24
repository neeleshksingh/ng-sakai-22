export class StudentFeeConcessionRequest {
    academicSessionIds?: number[];
    programIds?: number[];
    operationalVerticalIds?: number[];
    feeComponentIds?: number[];
    concessionCategoryIds?: number[];
    registrationNumbers?: string[];
    isValidRecord?: boolean=true;
}