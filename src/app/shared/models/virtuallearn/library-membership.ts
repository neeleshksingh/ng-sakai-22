import { AuditModel } from "../commons/audit-model";

export class LibraryMembership extends AuditModel {
    id?: number;
    firstName?: string;
    middleName?: string;
    lastName?: string;
    code?: string;
    email?: string;
    phoneNumber?: string;
    address1?: string;
    address2?: string;
    city?: string;
    state?: string;
    isExternal?: boolean;
    userType?: string;
    userName?: string;
    status?: string;
    fullName?: string;
}