import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { StudentStatus } from 'src/app/shared/models/finance-Pro/StudentStatus';
import { GenericService } from 'src/app/shared/services/generic.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StudentStatusService extends GenericService<StudentStatus, StudentStatus> {
  constructor(public override http: HttpClient, messageService: MessageService) {
    super(http, messageService, "StudentStatus", environment.apiAccountsUrl);
  }

  // private studentStatusSubject = new BehaviorSubject<StudentStatus[]>(null);

  saveStudentStatus(studentStatus: StudentStatus) {
    return this.http.post<StudentStatus>(environment.apiAccountsUrl + '/StudentStatus/Add', studentStatus);
  }

  updateStudentStatus(studentStatus: StudentStatus) {
    return this.http.put<StudentStatus>(environment.apiAccountsUrl + '/StudentStatus/UpdateById', studentStatus);
  }
  deleteByQueryParameters(studentStatusID: number) {
    return this.http.post<StudentStatus>(environment.apiAccountsUrl + `/StudentStatus/DeleteByIntId/${studentStatusID}` ,null );
  }
}