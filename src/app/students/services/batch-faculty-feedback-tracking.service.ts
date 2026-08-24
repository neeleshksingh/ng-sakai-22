import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class BatchFacultyFeedbackTrackingService {

    constructor(private http: HttpClient) { }

    GetTrackingByFeedbackAnnouncement(feedbackAnnouncementId: number, registrationNumber: string, batchCode:string) {
        return this.http.get<any>(environment.apiStudentsUrl + '/BatchFacultyFeedbackTracking/GetTrackingByFeedbackAnnouncement/'+feedbackAnnouncementId+'/RegistrationNumber/'+registrationNumber+'/BatchCode/'+batchCode);
    }

    getTrackingByRegistrationNumber(registrationNumber: string, subjectPaperCodeId :number) {
        return this.http.get<any>(environment.apiStudentsUrl + '/BatchFacultyFeedbackTracking/GetTrackingByRegistrationNumber/'+registrationNumber+'/SubjectPaperCode/'+subjectPaperCodeId);
    }

}
