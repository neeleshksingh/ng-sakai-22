import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AcademicTranscriptReportData, AcademicTranscriptReportUrlResponse } from 'src/app/shared/models/knowledge-stand/academic-transcript-report';
import { environment } from 'src/environments/environment';
import { GenericService } from './generic.service';

@Injectable({
  providedIn: 'root'
})
export class AcademicTranscriptReportService extends GenericService<AcademicTranscriptReportData, AcademicTranscriptReportData> {

  constructor(http: HttpClient) {
    super(http, "AcademicTranscriptReport", environment.apiExaminationsUrl);
  }

  downloadAcademicTranscriptReportByRegistrationNumber(registrationNumber: string) {
    return this.http.get<AcademicTranscriptReportUrlResponse>(environment.apiExaminationsUrl + '/AcademicTranscriptReport/DownloadAcademicTranscriptReportByRegistrationNumber/' + registrationNumber);
  }

  downloadHTMLAcademicTranscriptReportByRegistrationNumber(registrationNumber: string) {
    return this.http.get<any>(environment.apiExaminationsUrl + '/AcademicTranscriptReport/DownloadHtmlAcademicTranscriptReportByRegistrationNumber/' + registrationNumber);
  }

  downloadAcademicTranscriptReportByAsp(academicSessionId: number, programId: number, operationalVerticalId: number) {
    return this.http.get<AcademicTranscriptReportUrlResponse[]>(environment.apiExaminationsUrl + '/AcademicTranscriptReport/DownloadAcademicTranscriptReportByAcademicSession/' + academicSessionId + '/Program/' + programId + '/OperationalVertical/' + operationalVerticalId);
  }

  getAcademicTranscriptReportDataByRegistrationNumber(registrationNumber: string) {
    return this.http.get<AcademicTranscriptReportData[]>(environment.apiExaminationsUrl + '/AcademicTranscriptReport/GetAcademicTranscriptReportDataByRegistrationNumber/' + registrationNumber);
  }

  getAcademicTranscriptReportByRegistrationNumber(registrationNumber: string) {
    return this.http.get<AcademicTranscriptReportData>(environment.apiExaminationsUrl + '/AcademicTranscriptReport/GetAcademicTranscriptReportByRegistrationNumber/' + registrationNumber);
  }
}
