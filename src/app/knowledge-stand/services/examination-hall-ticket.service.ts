import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { AdmitCardSearch } from 'src/app/shared/models/knowledge-stand/admit-card';
import { ExaminationHallTicket, ExaminationHallTicketResponse } from 'src/app/shared/models/students/examination-hall-ticket';
import { GenericService } from 'src/app/shared/services/generic.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExaminationHallTicketService extends GenericService<ExaminationHallTicket, ExaminationHallTicketResponse> {

  constructor(http: HttpClient, messageService: MessageService) {
    super(http, messageService, "ExaminationHallTicket", environment.apiExaminationsUrl);
  }

  getByExaminationHallTicketSearchRequest(admitCardSearch: AdmitCardSearch) {
    return this.http.post<ExaminationHallTicketResponse>(environment.apiExaminationsUrl + '/ExaminationHallTicket/GetByExaminationHallTicketSearchRequest', admitCardSearch);
  }

  saveExaminationHallTicketDescription(admitCardSearch: AdmitCardSearch) {
    return this.http.post<any>(environment.apiExaminationsUrl + '/ExaminationHallTicket/SaveExaminationHallTicketDescription/', admitCardSearch);
  }

  saveExaminationHallTicketResponse(examinationHallTicketResponse: ExaminationHallTicketResponse) {
    return this.http.post<ExaminationHallTicketResponse>(environment.apiExaminationsUrl + '/ExaminationHallTicket/SaveExaminationHallTicketResponse', examinationHallTicketResponse);
  }


  downloadByExaminationHallTicketSearchRequest(admitCardSearch: AdmitCardSearch) {
    return this.http.post<any>(environment.apiExaminationsUrl + '/ExaminationHallTicket/DownloadByExaminationHallTicketSearchRequest', admitCardSearch);
  }
}
