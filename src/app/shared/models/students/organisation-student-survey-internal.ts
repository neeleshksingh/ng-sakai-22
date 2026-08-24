import { AuditModel } from "../commons/audit-model";
import { FeedbackAnnouncement } from "../executiveedge/feedback-announcement";
import { FeedbackQuestion } from "../executiveedge/feedbackQuestion";

export class OrganisationStudentSurveyInternal extends AuditModel {
    id?: number;
    feedbackAnnouncementId?: number;
    feedbackSubmittedBy?: string;
    feedbackQuestionId?: number;
    rating?: number;
    remarks?: string;
    status?: string;
}

export class SurveyResponse {
    feedbackAnnouncementResponse?: FeedbackAnnouncement;
    organisationStudentSurveyInternalTracking?: OrganisationStudentSurveyInternalTracking;
    feedbackQuestionResponses?: FeedbackQuestion[];
}

export class OrganisationStudentSurveyInternalTracking {
    id?: number;
    feedbackAnnouncementId?: number;
    isSubmitted?: boolean;
    status?: string;
}