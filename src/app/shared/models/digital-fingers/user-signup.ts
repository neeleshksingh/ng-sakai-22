import { AuditModel } from "../commons/audit-model";
import { Role } from "./role";

export class UserSignUp extends AuditModel {
    id?: number;
    userId?: string;
    userName?: string;
    firstName?: string;
    middleName?: string;
    lastName?: string;
    gender?: string;
    dateOfBirth?: any;
    maritalStatus?: string;
    displayName?: string;
    displayImageUrl?: string;
    email?: string;
    phoneNumber?: string;
    password?: string;
    country?: string;
    preferredLanguage?: string;
    userTimeZone?: string;
    status?: string;
    roles?: Role[]
}