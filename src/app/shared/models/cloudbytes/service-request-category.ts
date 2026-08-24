import { BaseModel } from "../commons/base-model";

export class ServiceRequestCategory extends BaseModel {
    serviceRequestDepartmentId?: number;
    serviceRequestDepartmentName?: string;
    serviceRequestWorkgroupId?: number;
    serviceRequestWorkgroupName?: string;
    supportEmailId?: string;
}