import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StudentProvisionalCertificate, StudentProvisionalCertificateFileUrl, StudentProvisionalCertificateResponse } from 'src/app/shared/models/knowledge-stand/student-provisional-certificate';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})

export class StudentProvisionalCertificateService {

  constructor(private httpClient: HttpClient) { }

  getProvisionalCertificateDataByRegistrationNumber(registrationNumber: string) {
    return this.httpClient.get<StudentProvisionalCertificateResponse>(environment.apiExaminationsUrl + "/StudentProvisionalCertificate/GetDataByRegistrationNumber/" + registrationNumber);
  }

  getByRegistrationNumber(registrationNumber: string) {
    return this.httpClient.get<StudentProvisionalCertificate>(environment.apiExaminationsUrl + "/StudentProvisionalCertificate/GetByRegistrationNumber/" + registrationNumber);
  }

  add(studentProvisionalCertificateResponse: StudentProvisionalCertificateResponse) {
    return this.httpClient.post<StudentProvisionalCertificateResponse>(environment.apiExaminationsUrl + "/StudentProvisionalCertificate/Add", studentProvisionalCertificateResponse);
  }

  downloadByRegistrationNumber(registrationNumber: string) {
    return this.httpClient.get<StudentProvisionalCertificateFileUrl>(environment.apiExaminationsUrl + "/StudentProvisionalCertificate/DownloadByRegistrationNumber/" + registrationNumber);
  }
  downloadHtmlByRegistrationNumber(registrationNumber: string) {
    return this.httpClient.get<StudentProvisionalCertificateFileUrl>(environment.apiExaminationsUrl + "/StudentProvisionalCertificate/DownloadHtmlByRegistrationNumber/" + registrationNumber);
  }
}