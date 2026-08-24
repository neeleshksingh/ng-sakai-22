import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { FeedbackQuestion } from 'src/app/shared/models/executiveedge/feedbackQuestion';
import { GenericService } from 'src/app/shared/services/generic.service';
import { environment } from 'src/environments/environment';


@Injectable({
    providedIn: 'root'
})
export class FeedbackQuestionService extends GenericService<FeedbackQuestion, FeedbackQuestion> {
    constructor(http: HttpClient, messageService: MessageService) {
        super(http, messageService, "FeedbackQuestion", environment.apiExecutiveEdgeUrl);
    }

    getByFeedbackAnnouncementId(feedbackAnnouncementId: number) {
        return this.http.get<FeedbackQuestion[]>(`${environment.apiExecutiveEdgeUrl}/FeedbackQuestion/GetByFeedbackAnnouncementId/${feedbackAnnouncementId}`);
    }
}