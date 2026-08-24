import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StudentFeedback } from 'src/app/shared/models/students/student-feedback';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class StudentFeedbackServices {
  
    constructor(private http: HttpClient) { }
    
      addBatchFacultyFeedback(studentFeedback:StudentFeedback[]) {
        return this.http.post(environment.apiStudentsUrl + '/BatchFacultyFeedback/AddMultiple', studentFeedback);
      }

      getActiveFeedbackAnnouncement() {
        return this.http.get<any>(environment.apiStudentsUrl + '/FeedbackAnnouncement/GetActiveFeedbackAnnouncement');
      }
}