import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UpdateInformationRequest, UpdateInformationResponce } from 'src/app/shared/models/students/student-profile-update-request';

import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class StudentProfileUpdateRequestService {

  constructor(private http: HttpClient) { }

  updateInformationRequest(updateInformationRequest: UpdateInformationRequest) {
    return this.http.post<UpdateInformationResponce[]>(environment.apiStudentsUrl + '/ServiceRequest/InsertStudentInformationRequest', updateInformationRequest);
  }

  uploadDocument(requestId: string, documentType: string, formData: FormData) {
    return this.http.post<UpdateInformationResponce[]>(environment.apiStudentsUrl + '/ServiceRequest/UploadDocument/RequestId/'+requestId+'/DocumentType/'+ documentType, formData);
  }
  GetStudentInformationUpdateRequestByStudentId(studentId: string) {
    return this.http.get<UpdateInformationResponce[]>(environment.apiStudentsUrl + '/ServiceRequest/GetStudentInformationUpdateRequestByStudentId/'+ studentId);
  }
}
