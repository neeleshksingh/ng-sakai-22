import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { AdmitCardSearch } from 'src/app/shared/models/knowledge-stand/admit-card';
import { ExaminationResponse } from 'src/app/shared/models/knowledge-stand/examination';
import { ExaminationHallTicketResponse } from 'src/app/shared/models/students/examination-hall-ticket';
import { GenericService } from 'src/app/shared/services/generic.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExaminationService extends GenericService<ExaminationResponse, ExaminationResponse> {

  constructor(http: HttpClient, messageService: MessageService) {
    super(http, messageService, "Examination", environment.apiExaminationsUrl);
  }

  getByAcademicSessionId(academicSessionId: number) {
    return this.http.get<ExaminationResponse[]>(environment.apiExaminationsUrl + '/Examination/GetByAcademicSessionId/' + academicSessionId);
  }

  getActiveExaminations() {
    return this.http.get<ExaminationResponse[]>(environment.apiExaminationsUrl + '/Examination/GetActiveExaminations');

  }

  getActiveExaminationsForMarksEntry() {
    return this.http.get<ExaminationResponse[]>(environment.apiExaminationsUrl + '/Examination/GetActiveExaminationsForMarksEntry');

  }

  getActiveExaminationByAcademicSessionProgramOperationalVertical(academicId: number, programId: number, operationalVerticalId: number,) {
    return this.http.get<ExaminationResponse[]>(environment.apiExaminationsUrl +
      '/Examination/GetActiveExaminationByAcademicSession/' + academicId + '/Program/' + programId + '/OperationalVertical/' + operationalVerticalId);
  }
}
