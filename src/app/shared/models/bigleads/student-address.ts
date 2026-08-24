import { BaseModel } from "../commons/base-model";
export class StudentAddress extends BaseModel {
    studentId?: string;
    addressType?: string;
    address1?: string;
    address2?: string;
    city?: string;
    state?: string;
    country?: string;
    postalCode?: string;
    latitude?: string;
    longitude?: string; 
}