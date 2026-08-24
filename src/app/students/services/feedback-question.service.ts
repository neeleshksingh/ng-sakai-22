import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


@Injectable({
    providedIn: 'root'
})
export class FeedbackQuestionServices {

    constructor(private http: HttpClient) { }

    getByFeedbackAnnouncementId(feedbackAnnouncementId: number) {
        return this.http.get<any>(environment.apiStudentsUrl + '/FeedbackQuestion/GetByFeedbackAnnouncementId/' + feedbackAnnouncementId);
    }
}