import { AuditModel } from "../commons/audit-model";

export class StudentConcessionCategory extends  AuditModel {
    id?: number;
    studentId?: string;
    studentName?: string;
    registrationNumber?: string;
    academicSessionId?:number;
    academicSessionName?:string;
    programId?:number;
    programName?: string;
    concessionCategoryId?:number;
    concessionCategoryName?: string;
    status?: string;
}