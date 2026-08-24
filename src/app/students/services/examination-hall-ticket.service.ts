import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  ExaminationHallTicketResponse,
  ExaminationHallTicketSearch
} from 'src/app/shared/models/students/examination-hall-ticket';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExaminationHallTicketService {

  constructor(private http: HttpClient) { }
  downloadByExaminationHallTicketSearchRequest(examinationHallTicketSearch: ExaminationHallTicketSearch) {
    return this.http.post<any>(environment.apiStudentsUrl +
      '/ExaminationHallTicket/DownloadByExaminationHallTicketSearchRequest', examinationHallTicketSearch);
  }

  downloadHTMLByExaminationHallTicketSearchRequest(examinationHallTicketSearch: ExaminationHallTicketSearch) {
    return this.http.post<any>(environment.apiStudentsUrl +
      '/ExaminationHallTicket/DownloadHtmlByExaminationHallTicketSearchRequest', examinationHallTicketSearch);
  }

  getByExaminationHallTicketSearchRequest(examinationHallTicketSearch: ExaminationHallTicketSearch) {
    return this.http.post<ExaminationHallTicketResponse>(environment.apiStudentsUrl +
      '/ExaminationHallTicket/GetByExaminationHallTicketSearchRequest', examinationHallTicketSearch);
  }
  saveExaminationHallTicketResponse(examinationHallTicketResponse: ExaminationHallTicketResponse) {
    return this.http.post<ExaminationHallTicketResponse>(environment.apiStudentsUrl +
      '/ExaminationHallTicket/SaveExaminationHallTicketResponse', examinationHallTicketResponse);
  }
}
