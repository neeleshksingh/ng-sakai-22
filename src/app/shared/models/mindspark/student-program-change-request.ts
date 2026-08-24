import { AuditModel } from "../commons/audit-model";

export class StudentProgramChangeRequest extends AuditModel {
    id?: number;
    registrationNumber?: string;
    currentAcademicSessionId?: number;
    currentProgramId?: number;
    currentSemesterId?: number;
    newAcademicSessionId?: number;
    newProgramId?: number;
    newSemesterId?: number;
    reasonForChange?: string;
    supportingDocuments?: string;
    isEligible?: boolean;
    isReviewed?: boolean;
    reviewedBy?: string;
    reviewComments?: string;
    reviewedDateTime?: Date;
    isApproved?: boolean;
    approvedBy?: string;
    approvalComments?: string;
    approvedDateTime?: Date;
    isStudentProgramUpdated?: boolean;
    studentProgramUpdatedBy?: string;
    studentProgramUpdatedDateTime?: Date;
    isFeeMasterUpdated?: boolean;
    feeMasterUpdatedBy?: string;
    feeMasterUpdatedDateTime?: Date;
    isFeeReceiptCancelled?: boolean;
    feeReceiptCancelledBy?: string;
    feeReceiptCancelledDateTime?: Date;
    isFeeReceiptReissued?: boolean;
    feeReceiptReissuedBy?: string;
    feeReceiptReissuedDateTime?: Date;
    status?: string;
}

export class StudentProgramChangeRequestResponse extends StudentProgramChangeRequest {
    currentAcademicSessionName?: string;
    currentProgramName?: string;
    currentSemesterName?: string;
    newAcademicSessionName?: string;
    newProgramName?: string;
    newSemesterName?: string;
    studentName?: string;
}