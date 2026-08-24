import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StudentMigrationCertificate, StudentMigrationCertificateFileUrl, StudentMigrationCertificateResponse } from 'src/app/shared/models/knowledge-stand/student-migration-certificate';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StudentMigrationCertificateService {

  constructor(private httpClient: HttpClient) { }

  getMigrationCertificateDataByRegistrationNumber(registrationNumber: string) {
    return this.httpClient.get<StudentMigrationCertificateResponse[]>(environment.apiExaminationsUrl + "/StudentMigrationCertificate/GetDataByRegistrationNumber/" + registrationNumber);
  }

  getByRegistrationNumber(registrationNumber: string) {
    return this.httpClient.get<StudentMigrationCertificate>(environment.apiExaminationsUrl + "/StudentMigrationCertificate/GetByRegistrationNumber/" + registrationNumber);
  }

  add(studentMigrationCertificateResponse: StudentMigrationCertificateResponse) {
    return this.httpClient.post<StudentMigrationCertificateResponse>(environment.apiExaminationsUrl + "/StudentMigrationCertificate/Add", studentMigrationCertificateResponse);
  }

  downloadByRegistrationNumber(registrationNumber: string) {
    return this.httpClient.get<StudentMigrationCertificateFileUrl>(environment.apiExaminationsUrl + "/StudentMigrationCertificate/DownloadByRegistrationNumber/" + registrationNumber);
  }
  downloadHTMLByRegistrationNumber(registrationNumber: string) {
    return this.httpClient.get<StudentMigrationCertificateFileUrl>(environment.apiExaminationsUrl + "/StudentMigrationCertificate/DownloadHtmlByRegistrationNumber/" + registrationNumber);
  }
}