import { AuditModel } from "../commons/audit-model";

export class UserAccount extends  AuditModel {
    id?: string;
    userId?:string;
    firstName?: string;
    lastName?: string;
    displayName?: string;
    displayImageUrl?: string;
    userName?: string;
    normalizedUserName?: string;
    email?: string;
    normalizedEmail?: string;
    emailConfirmed?: boolean;
    phoneNumber?: string;
    phoneNumberConfirmed?: boolean;
    twoFactorEnabled?: boolean;
    lockoutEnabled?: boolean;
    accessFailedCount?: number;
    roles?: string[];
}
