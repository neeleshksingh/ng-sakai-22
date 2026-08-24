import { AuditModel } from "../commons/audit-model";
export class EBCApplicantProfessionalHistory extends AuditModel{
    id?: number;
    jobApplicationId?: number;
    isCurrentEmployment?: boolean;
    employmentType?: string;
    organizationName?: string;
    designation?: string;
    joiningDate?: Date;
    lastWorkingDate?: Date;
    jobProfile?: string;
    lastCTC?: string;
    skillsUsed?: string;
    noticePeriodInDays?: number;
    status?: string;
}