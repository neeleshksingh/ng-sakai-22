import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StudentBatchTransferBridgeService {

  constructor(private http: HttpClient) { }

  studentBatchTransferBridgeUploadExcel(File: any ) {
    return this.http.post(environment.apiAcademicsUrl + '/StudentBatchTransferBridge/UploadExcel',  File);
  }

  uploadExcelFileFormat(File: any ) {
    return this.http.post(environment.apiAcademicsUrl + '/StudentBatchTransferBridge/UploadExcelFileFormat',  File);
  }

  downloadExcelFileFormat() {
    return this.http.post(environment.apiAcademicsUrl + '/StudentBatchTransferBridge/DownloadExcelFileFormat', {});
  }
}