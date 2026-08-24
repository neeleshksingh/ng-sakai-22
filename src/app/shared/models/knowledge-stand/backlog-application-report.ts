import { AuditModel } from "../commons/audit-model";

export class   BacklogExaminationApplicationReport extends AuditModel {
    id?: number;
    academicSessionId?: number;
    academicSessionName?: string;
    programId?: number;
    programName?: string;
    examinationId?: number;
    examinationName?: string;
    studentId?: string;
    registrationNumber?: string;
    studentName?: string;
    rollNumber?: string;
    remarks?: string;
    paymentStatus?: string;
    paymentReferenceNumber?: string;
    paidAmount?: number;
    status?: string;
    backlogExaminationApplicationSubjectPaperCodeResponseList?: BacklogExaminationApplicationSubjectPaperCodeResponseList[];
    isRegistrationCompleted?: boolean;
  
}

export class BacklogExaminationApplicationSubjectPaperCodeResponseList  extends AuditModel{
    
    id?: number;
    backlogExaminationApplicationId?: number;
    operationalVerticalId?: number;
    operationalVerticalName?: string;
    subjectPaperCodeId?: number;
    subjectPaperCodeName?: string;
    subjectName?: string;
    status?: string;

    
}