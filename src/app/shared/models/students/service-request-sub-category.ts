import { BaseModel } from "../commons/base-model";

export class ServiceRequestSubCategory extends BaseModel {
    serviceRequestDepartmentId?:number;
    serviceRequestDepartmentName?:string;
    serviceRequestWorkgroupId?:number;
    serviceRequestWorkgroupName?:string;
    serviceRequestCategoryId?:number;
    serviceRequestCategoryName?:string;
    supportEmailId?:string;
}