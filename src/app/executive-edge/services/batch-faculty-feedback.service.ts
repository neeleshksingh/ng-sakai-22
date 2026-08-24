import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BatchFacultyFeedbackService {

  constructor(private http: HttpClient) { }
  getBatchFacultyFeedbackByBatchFacultyFeedbackSearchRequest(payload : any) {
    return this.http.post<any>(environment.apiExecutiveEdgeUrl + '/BatchFacultyFeedback/GetByBatchFacultyFeedbackSearchRequest', payload);
  }

  getBatchFacultyFeedbackPivotByAnnouncementFacultyCode(feedbackAnnouncementId: number, facultyCode : string){
      return this.http.get<any>(environment.apiExecutiveEdgeUrl + `/BatchFacultyFeedback/GetBatchFacultyFeedbackPivotByFeedbackAnnouncement/${feedbackAnnouncementId}/FacultyCode/${facultyCode}`);
  }

  getBatchFacultyFeedbackPivotByFeedbackAnnouncement(feedbackAnnouncementId: number,){
    return this.http.get<any>(environment.apiExecutiveEdgeUrl + `/BatchFacultyFeedback/GetBatchFacultyFeedbackPivotByFeedbackAnnouncement/${feedbackAnnouncementId}`);
  }
}