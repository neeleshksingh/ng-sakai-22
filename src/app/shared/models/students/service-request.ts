import { BaseModel } from "../commons/base-model";

export class ServiceRequest extends BaseModel{
    IsRequestedForOther?: boolean;serviceRequestDepartmentId?: number;
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
    symptom?: string;
    userName?: string;
    requesterType?: string;
    requesterId ?: string;
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