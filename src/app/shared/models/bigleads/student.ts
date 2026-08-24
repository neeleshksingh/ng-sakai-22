import { AuditModel } from "../commons/audit-model";

export class Student extends AuditModel {
    id?: number;
    studentId?: string;
    studentGroupId?:string;
    studentGroupName?: string;
    studentGroupColor?: string;
    registrationNumber?: string;
    studentName?: string;
    admissionDate?: string;
    title?: string;
    firstName?: string;
    middleName?: string;
    lastName?: string;
    dob?: string;
    gender?: string;
    maritalStatus?: string
    bloodGroup?: string;
    phoneNumber?: string;
    email?: string;
    alternatePhoneNumber?: string;
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
    isMinority?: boolean;
    status?: string;
    studentImageUrl?: string;
    identityImagePath?: string;
    abcid?: string;
    studentFullName?: string;
}
export class UserOTPDetails extends AuditModel {
    id?: number;
    userName?: string;
    phoneNumber?: string;
    otp?: number;
    purpose?: string;
    expiryDateTime?: Date;
    isUsed?: false
    status?: string;
}
export class StudentOTPValidate {
    userOTPValidateRequest?: UserOTPDetails;
    student?: Student;
}