import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { StudentStatus } from 'src/app/shared/models/mindspark/student-status';
import { GenericService } from 'src/app/shared/services/generic.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StudentStatusService extends GenericService<StudentStatus, StudentStatus> {

  constructor(http: HttpClient, messageService: MessageService) {
    super(http, messageService, 'StudentStatus', environment.apiAcademicsUrl);
  }

  getByStudentId(studentId: string) {
    return this.http.get<StudentStatus[]>(environment.apiAcademicsUrl + '/StudentStatus/GetByStudentId/' + studentId);
  }

  getByName(name: string) {
    return this.http.get<StudentStatus[]>(environment.apiAcademicsUrl + '/StudentStatus/GetByName/' + name);
  }

  getByUserId(userId: string) {
    return this.http.get<StudentStatus[]>(environment.apiAcademicsUrl + '/StudentStatus/GetByUserId/' + userId);
  }

  getByAcademicSessionProgramOperationalVertical(academicSessionId: number, programId: number, operationalVerticalId: number) {
    return this.http.get<StudentStatus[]>(environment.apiAcademicsUrl + '/StudentStatus/GetByAcademicSession/' + academicSessionId + '/Program/' + programId + '/OperationalVertical/' + operationalVerticalId);
  }

  documentUploadbyStudentStatusId(studentStatusId: number, file: File) {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    return this.http.post(environment.apiAcademicsUrl + '/StudentStatus/UploadDocumentByStudentStatus/' + studentStatusId, formData);
  }
}

