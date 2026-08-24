import { AuditModel } from "../commons/audit-model";

export class StudentProfileUpdateRequest extends AuditModel {
    id?: string;
    studentId?: string;
    requestId?: string;
    propertyName?: string;
    propertyValue?: string;
    documentType?: string;
    isDocumentUploaded?: boolean;
    documentUrl?: string;
    comments?: string;
    remarks?: string;
    isRejected?: boolean;
    rejectedBy?: string;
    rejectedDate?: Date;
    rejectedCount?: number;
    isApproved?: boolean;
    approvedBy?: string;
    approvedDate?: Date;
    reviewerComments?: string;
    isRequestClosed?: boolean;
    status?: string;
}