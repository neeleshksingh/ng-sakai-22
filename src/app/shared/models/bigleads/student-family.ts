import { AuditModel } from "../commons/audit-model";

export class StudentFamily extends AuditModel {
    id?: number;
    familyRelationId?: string;
    familyRelationName?: string;
    dOB?: string;
    familyRelationTypeId?: number;
    title?: string;
    firstName?: string;
    middleName?: string;
    lastName?: string;
    dob?: Date;
    gender?: string;
    maritalStatus?: string;
    bloodGroup?: string;
    phoneNumber?: string;
    email?: string;
    aadharNumber?: string;
    voterId?: string;
    pan?: string;
    isPhysicallyHandicaped?: boolean;
    casteId?: number;
    casteCategoryId?: number;
    religionId?: number;
    motherTongue?: string;
    qualification?: string;
    profession?: string;
    workAddress?: string;
    workPhoneNumber?: string;
    workEmail?: string;
    status?: string;
    studentId?: string;
}