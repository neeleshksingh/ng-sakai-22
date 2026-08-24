import { FeedbackAnnouncement } from "../executiveedge/feedback-announcement"

export class FeedbackSurveyTracking {
    hasBatchFacultyFeedbackPending?: boolean;
    hasOrganisationFacultyFeedbackInternalPending?: boolean;
    hasOrganisationStudentSurveyInternalPending?: boolean;
    feedbackAnnouncementResponses?: FeedbackAnnouncement[];
    batchFacultyFeedbackTrackingResponses?: BatchFacultyFeedbackTrackingResponse[];
    organisationFeedbackInternalTrackingResponses?: OrganisationFeedbackInternalTrackingResponse[];
    organisationStudentSurveyInternalTrackingResponses?: OrganisationStudentSurveyInternalTrackingResponse[];
}

export class BatchFacultyFeedbackTrackingResponse {
    id?: number;
    feedbackAnnouncementId?: number;
    operationalVerticalId?: number;
    batchCode?: string;
    isSubmitted?: boolean;
    status?: string;
}

export class OrganisationFeedbackInternalTrackingResponse {
    id?: number;
    feedbackAnnouncementId?: number;
    employeeCode?: string;
    isSubmitted?: boolean;
    status?: string;
    studentName?: string;
}

export class OrganisationStudentSurveyInternalTrackingResponse {
    id?: number;
    feedbackAnnouncementId?: number;
    studentId?: string;
    isSubmitted?: boolean;
    status?: string;
    studentName?: string;
}