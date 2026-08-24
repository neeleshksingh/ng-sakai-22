import { BaseModel } from "../commons/base-model";

export class Company extends BaseModel {
    phoneNumber?: string;
    email?: string;
    address?: string;
    gstNumber?: string;
    glNumber?: string;
}