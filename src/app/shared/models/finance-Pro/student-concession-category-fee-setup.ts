import { AuditModel } from "../commons/audit-model";

export class StudentConcessionCategoryFeeSetup extends  AuditModel {
    id?: number;
    studentId?: string;
    studentName?: string;
    registrationNumber?: string;
    academicSessionId?:number;
    academicSessionName?:string;
    programId?: number;
    programName?: string;
    operationalVerticalId?: number;
    operationalVerticalName?: string;
    feeComponentId?: number;
    feeComponentName?: string;
    isSpecificConcession?:boolean;
    concessionCategoryId?: number;
    concessionCategoryName?: string;
    concessionUnit?: string;
    concessionValue?: number;
    concessionAmount?:number;
    finalConcessionAmount?:number;
    isSyncedToStudentFeeMaster?:boolean;
    status?: string;
    description?: string
}