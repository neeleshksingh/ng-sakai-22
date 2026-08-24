import { AuditModel } from "../commons/audit-model";

export class OrganisationFeedbackInternalTracking extends AuditModel {
    id?: number;
    feedbackAnnouncementId?: number;
    employeeCode?: string;
    isSubmitted?: boolean;
    status?: string;
}

export class OrganisationFeedbackInternalTrackingResponse extends OrganisationFeedbackInternalTracking {
    employeeName?: string;
}