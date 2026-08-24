import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { FeedbackAnnouncementFeedbackQuestions } from 'src/app/shared/models/executiveedge/feedback-announcement-feedback-question';
import { GenericService } from 'src/app/shared/services/generic.service';
import { environment } from 'src/environments/environment';


@Injectable({
    providedIn: 'root'
})
export class FeedbackAnnouncementFeedbackQuestionsService  extends GenericService <FeedbackAnnouncementFeedbackQuestions, FeedbackAnnouncementFeedbackQuestions>{
    constructor(http: HttpClient, messageService: MessageService) {
        super(http, messageService, "FeedbackAnnouncementFeedbackQuestion", environment.apiExecutiveEdgeUrl);
    }  
    getFeedbackAnnouncementFeedbackQuestionByFeedbackAnnouncementId(id: number) {
        return this.http.get<FeedbackAnnouncementFeedbackQuestions[]>(environment.apiExecutiveEdgeUrl + '/FeedbackAnnouncementFeedbackQuestion/GetByFeedbackAnnouncementId/' + id);
    }   
}