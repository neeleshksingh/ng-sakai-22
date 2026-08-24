import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FeedbackSurveyTracking } from 'src/app/shared/models/global/feedback-survey-tracking';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class UserFeedbackSurveyTrackingGlobalService {

    constructor(private http: HttpClient) { }

    getFeedbackSurveyTracking() {
        return this.http.get<FeedbackSurveyTracking[]>(environment.apiGlobalUrl + '/UserFeedbackSurveyTracking/GetFeedbackSurveyTracking');
    }
}