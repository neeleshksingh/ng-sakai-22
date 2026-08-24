import { AuditModel } from "../commons/audit-model";

export class FeedbackAnnouncementFeedbackQuestions extends AuditModel {
    id?: number;
    displayOrder?: number;
    feedbackAnnouncementId?: number;
    feedbackAnnouncementName?: string;
    feedbackQuestionId?: number;
    feedbackQuestionName?: string;
    status?: string
}