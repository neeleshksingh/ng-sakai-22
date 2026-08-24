import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class StudentBatchTransferService {

    constructor(private http: HttpClient) { }

    getBatchCodeFacultyCode(registrationNumber: string, operationalVerticalId: number) {
        return this.http.get<any>(environment.apiStudentsUrl + '/StudentBatchTransfer/GetByRegistrationNumber/'+registrationNumber+'/OperationalVertical/'+operationalVerticalId);
      }
 

}