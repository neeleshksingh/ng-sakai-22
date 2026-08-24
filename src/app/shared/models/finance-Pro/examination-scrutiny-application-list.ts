import { BaseModel } from "../commons/base-model";

export class ExaminationScrutinyApplicationList extends BaseModel{
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
    examinationScrutinyApplicationSubjectPaperCodes?: [
      {
        id?: number;
        examinationScrutinyApplicationId?: number;
        subjectPaperCodeId?: number;
        status?: string
      }
    ]
}