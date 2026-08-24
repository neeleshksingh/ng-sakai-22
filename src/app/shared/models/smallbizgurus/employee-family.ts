import { BaseModel } from "../commons/base-model";

export class EmployeeFamily extends BaseModel {
    familyRelationId?: number;
    firstName?: string;
    middleName?: string;
    lastName?: string;
    dob?: string;
    gender?: string;
    maritalStatus?: string;
    bloodGroup?: string;
    phoneNumber?: string;
    email?: string;
    aadharNumber?: string;
    voterId?: string;
    pan?: string;
    isPhysicallyHandicaped?: boolean;
    castId?: number;
    castCategoryId?: number;
    religionId?: number;
    motherTongue?: string;
    qualification?: string;
    profession?: string;
    workAddress?: string;
    workPhoneNumber?: string;
    workEmail?: string;
    employeeId?: number;
}