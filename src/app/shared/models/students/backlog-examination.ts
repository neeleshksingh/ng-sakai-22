import { AuditModel } from "../commons/audit-model";

export class BacklogExaminationApplicationDetails extends AuditModel {
  id?: number;
  academicSessionId?: number;
  programId?: number;
  examinationId?: number;
  studentId?: string;
  registrationNumber?: string;
  rollNumber?: string;
  remarks?: string;
  paymentStatus?: string;
  paidAmount?: number;
  dueAmount? : number;
  status?: string;
  backlogExaminationApplicationSubjectPaperCodes?: [
    {
      createdBy?: string,
      modifiedBy?: string,
      createdDate?: Date,
      modifiedDate?: Date,

      id?: number,
      backlogExaminationApplicationId?: number,
      operationalVerticalId?: number,
      subjectPaperCodeId?: number,
      status?: string
    }
  ]
}

export class BacklogExaminationStudentDetails {
  id?: number;
  academicSessionId?: number;
  academicSessionName?: string;
  programId?: number;
  programName?: string;
  studentId?: string;
  studentName?: string;
  examinationId?: number;
  registrationNumber?: string;
  rollNumber?: string;
  paidAmount?: number;
  dueAmount? : number;
  paymentStatus? :string;
  backlogExaminationApplicationSubjectPaperCodeResponseList?: [
    {
      operationalVerticalName?: string,
      studentId?: string,
      registrationNumber?: string,
      subjectName?: string,
      subjectPaperCodeName?: string,
      id?: number,
      backlogExaminationApplicationId?: number,
      operationalVerticalId?: number,
      subjectPaperCodeId?: number,
    },
  ]
}

