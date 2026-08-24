import { AuditModel } from "../commons/audit-model";

export class EBCApplicantInformation extends AuditModel {
    id?: number;
    jobApplicationId?: number;
    firstName?: string;
    middleName?: string;
    lastName?: string;
    dateOfBirth?: any;
    email?: string;
    phoneNumber?: string;
    aadharNumber?: string;
    pan?: string;
    status?: string;
}