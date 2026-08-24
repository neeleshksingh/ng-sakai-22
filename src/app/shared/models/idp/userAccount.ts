export class ApplicationUser {
    id?: string;
    userId?: string;
    firstName?: string;
    middleName?: string;
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
    partnerCode?: string;
    twoFactorEnabled?: boolean;
    lockoutEnabled?: boolean;
    accessFailedCount?: number;
    roles?: string[];
    uniqueUserCode?: string;
    createdBy?: string;
    modifiedBy?: string;
    createdDate?: Date;
    modifiedDate?: Date;

    gender?: string;
    passwordHash?: string;
    securityStamp?: string;
    concurrencyStamp?: string;
}
