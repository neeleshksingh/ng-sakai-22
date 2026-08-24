import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class StudentSemesterRegistrationstatusReportService {

    constructor(private http: HttpClient) { }

    // getFeeReceiptCancellationDetailsByDateRange(payload) {
    //     return this.http.post<any>(environment.apiAccountsUrl + '/Payment/GetFeeReceiptCancellationDetailsByDateRange', payload);
    // }

    getStudentSemesterRegistrationStatusReportBySearchRequest(payload:any){
        return this.http.post<any>(environment.apiAccountsUrl + `/StudentSemesterExaminationRegistrationStatus/GetBySearchRequest`, payload)
    }
}