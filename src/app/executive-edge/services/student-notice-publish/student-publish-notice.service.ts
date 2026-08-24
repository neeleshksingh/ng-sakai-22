import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { MessageService } from 'primeng/api';
import { StudentNotice, StudentPublishNotice } from 'src/app/shared/models/executiveedge/student-publish-notice';
import { GenericService } from 'src/app/shared/services/generic.service';

@Injectable({
  providedIn: 'root'
})
export class StudentNoticePublishService extends GenericService<StudentPublishNotice, StudentPublishNotice>{
  
  constructor(http: HttpClient, messageService: MessageService) {
      super(http, messageService, "StudentNotice", environment.apiExecutiveEdgeUrl);
  }

  getStudentPublishNoticeByNoticeId(noticeId: number) {
    return this.http.get<StudentPublishNotice[]>(environment.apiExecutiveEdgeUrl + '/StudentNotice/GetByNoticeId/' + noticeId);
  }
  addStudentPublishNotice(studentPublishNotice: StudentPublishNotice) {
    return this.http.post<StudentPublishNotice>(environment.apiExecutiveEdgeUrl + '/StudentNotice/Add', studentPublishNotice);
  }
  addMultipleStudentPublishNotice(studentPublishNotice: StudentNotice[]) {
    return this.http.post<StudentPublishNotice[]>(environment.apiExecutiveEdgeUrl + '/StudentNotice/AddMultiple', studentPublishNotice);
  }

  updateStudentPublishNotice(studentPublishNotice: StudentPublishNotice) {
    return this.http.put<StudentPublishNotice>(environment.apiExecutiveEdgeUrl + '/StudentNotice/UpdateById', studentPublishNotice);
  }
  
  getStudentPublishNoticeById(studentPublishNoticeId: number) {
    return this.http.get<StudentPublishNotice>(environment.apiExecutiveEdgeUrl + '/StudentNotice/GetByIntId/' + studentPublishNoticeId);
  }

  deleteStudentPublishNoticeById(studentPublishNoticeId: number) {
    return this.http.post<StudentPublishNotice[]>(environment.apiExecutiveEdgeUrl + `/StudentNotice/DeleteByIntId/${studentPublishNoticeId}` ,null );
  }
}