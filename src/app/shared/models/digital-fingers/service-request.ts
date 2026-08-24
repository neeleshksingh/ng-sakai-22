import { AuditModel } from "../commons/audit-model";

export class ServiceRequest extends AuditModel{
    serviceRequestDepartmentId?: number;
    serviceRequestWorkgroupId?: number;
    serviceRequestCategoryId?: number;
    serviceRequestSubCategoryId?: number;
    serviceRequestDepartmentName?: string;
    serviceRequestWorkgroupName?: string;
    serviceRequestCategoryName?: string;
    serviceRequestSubCategoryName?: string;
    isRequestedForOther?: boolean;
    requestedForId?: string;
    priority?: string;
    location?: string;
    contactNumber?: string;
    extensionNumber?: string;
    name?: string;
    title?: string;
    symptom?: string;
    id?: number;
    userName?: string;
    requesterType?: string;
    requesterId ?: string;
    status?: string;
    isApprovalRequired?: boolean
    approvalReview?: string;
    assignTo?: string;
    reviewComment?: string;
    documentName?: string;
    attachmentUrl?: string;
    documentDescription?: string;
    documentTitle?: string;
    documentStatus?: string;
    workflowStatus?: string;
}