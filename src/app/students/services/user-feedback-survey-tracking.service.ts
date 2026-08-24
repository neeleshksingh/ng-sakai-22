import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FeedbackSurveyTracking } from 'src/app/shared/models/global/feedback-survey-tracking';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class UserFeedbackSurveyTrackingStudentsService {

    constructor(private http: HttpClient) { }

    getFeedbackSurveyTracking() {
        return this.http.get<FeedbackSurveyTracking[]>(environment.apiStudentsUrl + '/UserFeedbackSurveyTracking/GetFeedbackSurveyTracking');
    }
}