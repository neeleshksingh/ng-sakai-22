import { AuditModel } from "../commons/audit-model";

export class OrganisationFeedbackInternal extends AuditModel {
    id?: number;
    feedbackAnnouncementId?: number;
    feedbackSubmittedBy?: string;
    feedbackQuestionId?: number;
    rating?: number;
    remarks?: string;
    status?: string;
}

export class OrganisationFeedbackPivotReport
{
    batchFacultyFeedbackList: any[] = [];
}