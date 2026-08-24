import { AuditModel } from "../commons/audit-model";

export class ServiceRequestMapping extends AuditModel {
    id?: number;
    serviceRequestDepartmentId?: number;
    serviceRequestWorkgroupId?: number;
    serviceRequestCategoryId?: number;
    serviceRequestSubCategoryId?: number;
    supportEmailId?: string;
    status?: string;
}

export class GetBySearchRequest {
    departmentIds?: [number];
    workgroupIds?: [number];
    categoryIds?: [number];
    subCategoryIds?: [number];
}

export class ServiceRequestMappingResponse extends AuditModel {
    id?: number;
    serviceRequestDepartmentId?: number;
    serviceRequestDepartmentName?: string;
    serviceRequestWorkgroupName?: string;
    serviceRequestCategoryName?: string;
    serviceRequestSubCategoryName?: string;
    serviceRequestWorkgroupId?: number;
    serviceRequestCategoryId?: number;
    serviceRequestSubCategoryId?: number;
    supportEmailId?: string;
    status?: string;
    isApprovalRequired?: boolean;
}