import { AuditModel } from "../commons/audit-model";

export class EBCApplicantEducationHistory extends AuditModel {
    id?: number;
    jobApplicationId?: number;
    degreeName?: string;
    schoolCollegeName?: string;
    boardUniversityName?: string;
    passingYear?: string;
    speciality?: string;
    subjects?: string;
    totalMarks?: string;
    obtainedMarks?: string;
    startDate?: any;
    endDate?: any;
    grade?: string;
    status?: string;
}