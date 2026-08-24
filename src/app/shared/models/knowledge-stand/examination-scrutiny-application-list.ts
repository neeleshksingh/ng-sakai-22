export class ExaminationScrutinyApplicationList {
    createdBy?: string;
    modifiedBy?: string;
    createdDate?: Date;
    modifiedDate?: Date;
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