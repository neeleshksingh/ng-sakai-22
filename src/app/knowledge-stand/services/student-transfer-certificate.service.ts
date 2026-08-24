import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StudentTransferCertificate, StudentTransferCertificateFileUrl, StudentTransferCertificateResponse } from 'src/app/shared/models/knowledge-stand/student-transfer-certificate';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StudentTransferCertificateService {

  constructor(private httpClient: HttpClient) { }
  getTransferCertificateDataByRegistrationNumber(registrationNumber: string) {
    return this.httpClient.get<StudentTransferCertificateResponse[]>(environment.apiExaminationsUrl + "/StudentTransferCertificate/GetDataByRegistrationNumber/" + registrationNumber);
  }

  getByRegistrationNumber(registrationNumber: string) {
    return this.httpClient.get<StudentTransferCertificate>(environment.apiExaminationsUrl + "/StudentTransferCertificate/GetByRegistrationNumber/" + registrationNumber);
  }

  add(studentTransferCertificateResponse: StudentTransferCertificateResponse) {
    return this.httpClient.post<StudentTransferCertificateResponse>(environment.apiExaminationsUrl + "/StudentTransferCertificate/Add", studentTransferCertificateResponse);
  }

  downloadByRegistrationNumber(registrationNumber: string) {
    return this.httpClient.get<StudentTransferCertificateFileUrl>(environment.apiExaminationsUrl + "/StudentTransferCertificate/DownloadByRegistrationNumber/" + registrationNumber);
  }
  downloadHTMLByRegistrationNumber(registrationNumber: string) {
    return this.httpClient.get<StudentTransferCertificateFileUrl>(environment.apiExaminationsUrl + "/StudentTransferCertificate/DownloadHtmlByRegistrationNumber/" + registrationNumber);
  }
}