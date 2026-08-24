import { AuditModel } from "../commons/audit-model";
import { InterviewSchedule } from "./interview-schedule";
import { InterviewStatus } from "./interview-status";
import { JobApplicationWorkflow } from "./job-application-workflow";

export class JobApplication extends AuditModel {
    id?: number;
    email?: string;
    phoneNumber?: string;
    source?: string;
    address?: string;
    city?: string;
    state?: string;
    country?: string;
    postalCode?: string;
    resumeLink?: string;
    expectedCTC?: number;
    firstName?: string;
    middleName?: string;
    lastName?: string;
    dateOfBirth?: any;
    gender?: string;
    maritalStatus?: string;
    status?: string;

    jobOpeningId?: number;
    jobTitle?: string;
    departmentId?: number;
    departmentName?: string;
    designationId?: number;
    designationName?: string;
    staffingPlanId?: number;
    staffingPlanName?: string;

    interviewScheduleList?: InterviewSchedule[];
    interviewStatusList?: InterviewStatus[];
    jobApplicationEducationalHistoryList?: JobApplicationEducationalHistory[];
    jobApplicationProfessionalHistoryList?: JobApplicationProfessionalHistory[];
    jobApplicationWorkflowList?: JobApplicationWorkflow[];

    isReviewedByCandidate?: boolean;
    isTermsAndConditionsAccepted?: boolean;
}

export class JobApplicationEducationalHistory extends AuditModel {
    id?: number;
    jobApplicationId?: number;
    degreeName?: string;
    schoolCollegeName?: string;
    boardUniversityName?: string;
    natureOfEducation?: string;
    yearOfCompletion?: string;
    speciality?: string;
    subjects?: string;
    totalMarks?: string;
    obtainedMarks?: string;
    grade?: string;
    status?: string;
}

export class JobApplicationProfessionalHistory extends AuditModel {
    id?: number;
    jobApplicationId?: number;
    isCurrentEmployment?: boolean;
    employmentType?: string;
    organizationName?: string;
    designation?: string;
    joiningDate?: any;
    lastWorkingDate?: any;
    jobProfile?: string;
    lastCTC?: string;
    skillsUsed?: string;
    noticePeriodInDays?: number;
    status?: string;
}

export class JobDocument extends AuditModel {
    id?: number;
    documentType?: string;
}

export class Otp {
    userName?: string;
    phoneNumber?: string;
    purpose?: string;
}