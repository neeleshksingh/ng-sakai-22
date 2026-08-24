import { BaseModel } from "../commons/base-model";

export class Employee extends BaseModel {
    employeeCode?: string;
    firstName?: string;
    middleName?: string;
    lastName?: string;
    dateOfBirth?: Date;
    emailId?: string;
    phoneNumber?: string;
    gender?: string;
    religionId?: number;
    castCategoryId?: number;
    castId?: number;
    maritalStatus?: string;
    isSpecialAbled?: boolean;
    bloodGroup?: string;
    nationality?: string;
    employeePhotoUrl?: string;
    lastDesignationName?: string;
}