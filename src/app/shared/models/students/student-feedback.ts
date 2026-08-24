import { AuditModel } from "../commons/audit-model";

export class StudentFeedback extends AuditModel{
    id?: number;
    feedbackAnnouncementId?:number;
    operationalVerticalId?:number;
    batchCode?: string;
    facultyCode?: string;
    feedbackSubmittedBy?: string;
    feedbackQuestionId?: number;
    rating?: number;
    status?: string;
}