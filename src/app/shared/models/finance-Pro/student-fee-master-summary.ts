import { AuditModel } from "../commons/audit-model";

export class StudentFeeMasterSummary extends AuditModel {
    id?: number;
    AcademicSession?: string;
    Program?: string;
    Semester?: string;
    RegistrationNumber?: string;
    StudentName?: string;
    ComponentFee?: number;
    ConcessionAmount?: number;
    FeeAmount?: number;
    PaidAmount?: number;
    DueAmount?: number;
  }