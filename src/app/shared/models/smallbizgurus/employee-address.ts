import { BaseModel } from "../commons/base-model";

export class EmployeeAddress extends BaseModel {
    employeeId?: number;
    addressType?: string;
    address1?: string;
    address2?: string;
    city?: string;
    state?: string;
    country?: string;
    pin?: string;
    phoneNumber?: string;
    email?: string;
    landmark?: string;
    periodFrom?: string;
    periodTo?: string;
    latitude?: string;
    longitude?: string;
}