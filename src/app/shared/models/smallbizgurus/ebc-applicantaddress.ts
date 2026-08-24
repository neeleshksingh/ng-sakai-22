import { AuditModel } from "../commons/audit-model";

export class EBCApplicantAddress extends AuditModel{
    id?:number;
    jobApplicationId?: number;
    addressType?: string;
    address1?: string;
    address2?: string;
    city?: string;
    state?: string;
    country?: string;
    postalCode?: string;
    startDate?: any;
    endDate?: any;
    status?: string;
}