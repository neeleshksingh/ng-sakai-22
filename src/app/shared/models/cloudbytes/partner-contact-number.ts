import { BaseModel } from "../commons/base-model";

export class PartnerContactNumber extends BaseModel {
    partnerContactCategoryId?: number;
    partnerContactCategoryName?: string;
    hasEmployeeCode?: boolean;
    employeeCode?: string;
    designation?: string;
    phoneNumber?: string;
    email?: string;
    location?: string | undefined;
    fromTime?: string | undefined;
    toTime?: string | undefined;
}
