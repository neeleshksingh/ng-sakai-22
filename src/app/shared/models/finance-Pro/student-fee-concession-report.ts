export class StudentFeeConcessionReport {
    id?: number;
    studentId?: string;
    studentName?: string;
    registrationNumber?: string;
    programId?: number;
    programName?: string;
    operationalVerticalId?: number;
    operationalVerticalName?: string;
    concessionCategoryId?: number;
    concessionCategoryName?: string;
    componentFee?:string;
    feeComponentId?: number;
    feeComponentName?: string;
    concessionUnit?: string;
    concessionValue?: number;
    concessionAmount?: number;
    isSpecificConcession?:boolean;
    isSpecificConcessionName?:string;
    isSyncedToStudentFeeMaster?: string;
}