import { BaseModel } from "../commons/base-model";

export class EmployeeContact extends BaseModel {
    employeeId?: number;
    homeEmail?: string;
    homePhoneNumber?: string;
    workEmail?: string;
    workPhoneNumber?: string;
    workPhoneExtension?: string;
}