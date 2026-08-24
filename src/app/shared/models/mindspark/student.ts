import { AuditModel } from "../commons/audit-model";

export class Student extends AuditModel {
    id?: number;
    studentId?: string;
    admissionDate?: string;
    title?: string;
    firstName?: string;
    middleName?: string;
    lastName?: string;
    dob?: string;
    isMinority?: boolean;
    gender?: string;
    maritalStatus?: string;
    bloodGroup?: string;
    phoneNumber?: string;
    email?: string;
    alternatePhoneNumber?: string;
    studentStatusDescriptionName?: string;
    alternateEmail?: string;
    aadharNumber?: string;
    voterId?: string;
    pan?: string;
    isPhysicallyHandicaped?: boolean;
    casteId?: number;
    casteName?: string;
    casteCategoryId?: number;
    casteCategoryName?: string;
    categoryName?: string;
    religionId?: number;
    religionName?: string;
    motherTongue?: string;
    statusDescription?: string;
    status?: string;
    studentImageUrl?: string;
    abcid?: string;
}