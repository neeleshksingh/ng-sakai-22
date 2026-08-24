import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StudentProfileUpdateRequest } from 'src/app/shared/models/bigleads/student-profile-update-request';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StudentProfileUpdatePendingRequestService {

  constructor(private http: HttpClient) { }

  getStudentInformationUpdateRequestPendings() {
    return this.http.get<StudentProfileUpdateRequest[]>(environment.apiLeadsUrl + '/ServiceRequest/GetStudentInformationUpdateRequestPendings');
  }
  updateStudentInformationUpdateRequestByRequestId(studentProfileUpdateRequest: StudentProfileUpdateRequest) {
    return this.http.post<StudentProfileUpdateRequest[]>(environment.apiLeadsUrl + '/ServiceRequest/UpdateStudentInformationUpdateRequestByRequestId/' + studentProfileUpdateRequest.requestId, studentProfileUpdateRequest);
  }
}