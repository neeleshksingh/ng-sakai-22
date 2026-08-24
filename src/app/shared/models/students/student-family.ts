import { AuditModel } from "../commons/audit-model";

export class StudentFamily extends AuditModel{
    id?: number;
    studentId?: string;
    familyRelationId?: string;
    familyRelationName?: string;
    title?: string;
    firstName?: string;
    middleName?: string;
    lastName?: string;
    dob?: string;
    gender?: string;
    meritalStatus?: string;
    bloodGroup?: string;
    phoneNumber?: string;
    email?: string;
    aadharNumber?: string;
    voterId?: string;
    pan?: string;
    isPhysicallyHandicaped?: boolean;
    cast?: string;
    category?: string;
    religion?: string;
    motherTongue?: string;
    status?: string;
}