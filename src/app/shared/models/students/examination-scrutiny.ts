import { AuditModel } from "../commons/audit-model";

export class ExaminationScrutiny extends AuditModel {
    id?: number;
    academicSessionId?: number;
    programId?: number;
    operationalVerticalId?: number;
    examinationId?: number;
    studentId?: string;
    registrationNumber?: string;
    rollNumber?: string;
    remarks?: string;
    paymentStatus?: string;
    paidAmount?: number;
    status?: string;
    examinationScrutinyApplicationSubjectPaperCodes?: [
      {
        id?: number;
        examinationScrutinyApplicationId?: number;
        subjectPaperCodeId?: number;
        status?: string
      }
    ]
}