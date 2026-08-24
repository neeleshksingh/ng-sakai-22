import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EKalyanBonafide, EKalyanScholarship } from 'src/app/shared/models/finance-Pro/ekalyan-bonafide';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CertificatesService {

  
  constructor(private http: HttpClient) { }

  downloadStudentBonafideJobByStudentCertificateRequest(eKalyanBonafide: EKalyanBonafide) {
    return this.http.post<any>(environment.apiAccountsUrl + '/StudentCertificate/DownloadStudentBonafideJobByStudentCertificateRequest', eKalyanBonafide);
  }

  downloadEKalyanScholarshipByStudentCertificateRequest(eKalyanScholarship: EKalyanScholarship) {
    return this.http.post<any>(environment.apiAccountsUrl + '/StudentCertificate/DownloadStudentBonafideEKalyanByStudentCertificateRequest', eKalyanScholarship);
  }
  
  downloadStudentBonafideFeesByStudentCertificateRequest(eKalyanScholarship: EKalyanScholarship) {
    return this.http.post<any>(environment.apiAccountsUrl + '/StudentCertificate/DownloadStudentBonafideFeesByStudentCertificateRequest', eKalyanScholarship);
  }
}
