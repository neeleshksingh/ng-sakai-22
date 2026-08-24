import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StudentFeeMaster } from 'src/app/shared/models/finance-Pro/student-fee-master';
import { StudentFeeMasterCommulative } from 'src/app/shared/models/finance-Pro/student-fee-master-commulative';
import { StudentFeeMasterFilter } from 'src/app/shared/models/finance-Pro/student-fee-master-filter';
import { StudentFeeMasterSummary } from 'src/app/shared/models/finance-Pro/student-fee-master-summary';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class StudentFeeMasterService {

    constructor(private http: HttpClient) { }

    getStudentFeeMasterCommulativeByAcademicSession(academicSessionId: number, programId: number): Observable<StudentFeeMasterCommulative[]> {
        return this.http.get<StudentFeeMasterCommulative[]>(`${environment.apiAccountsUrl}/StudentFeeMaster/GetStudentFeeMasterCommulativeByAcademicSession/${academicSessionId}/Program/${programId}`);
    }

    getStudentFeeMasterCommulativeByRegistrationNumber(registrationNumber: string): Observable<StudentFeeMasterCommulative[]> {
        return this.http.get<StudentFeeMasterCommulative[]>(`${environment.apiAccountsUrl}/StudentFeeMaster/GetStudentFeeMasterCommulativeByRegistrationNumber/${registrationNumber}`);
    }

    generateStudentFeeMasterByRegistrationNumber(registrationNumber: string): Observable<HttpResponse<any>> {
        return this.http.get<any>(`${environment.apiAccountsUrl}/StudentFeeMaster/GenerateStudentFeeMasterByRegistrationNumber/${registrationNumber}`, { observe: 'response' });
    }


    generateStudentFeeMasterByProgramWise(academicSessionId: number, programId: number): Observable<HttpResponse<any>> {
        return this.http.get<any>(`${environment.apiAccountsUrl}/StudentFeeMaster/GenerateStudentFeeMasterByAcademicSession/${academicSessionId}/Program/${programId}`, { observe: 'response' });
    }

    getStudentFeeMasterByAcedemicSessionIdProgramIdFeeComponentId(academicSessionId: number, programId: number, feeComponentId: number): Observable<StudentFeeMaster[]> {
        return this.http.get<StudentFeeMaster[]>(`${environment.apiAccountsUrl}/StudentFeeMaster/GetStudentFeeMasterByAcedemicSessionIdProgramIdFeeComponentId/${academicSessionId}/${programId}/${feeComponentId}`);
    }

    modifyStudentFeeMasterByNewFeeComponent(studentFeeMaster: StudentFeeMaster[]): Observable<HttpResponse<any>> {
        return this.http.post<any>(`${environment.apiAccountsUrl}/StudentFeeMaster/ModifyStudentFeeMasterByNewFeeComponent`, studentFeeMaster, { observe: 'response' });
    }

    StudentFeeMasterGetByParameters(studentFeeMasterFilter: StudentFeeMasterFilter[]): Observable<StudentFeeMaster[]> {
        return this.http.post<StudentFeeMaster[]>(`${environment.apiAccountsUrl}/StudentFeeMaster/GetByStudentFeeMasterSearchRequest`, studentFeeMasterFilter);
    }

    getStudentFeeMasterList(studentFeeMasterFilter: StudentFeeMasterFilter[]): Observable<StudentFeeMaster[]> {
        return this.http.post<StudentFeeMaster[]>(`${environment.apiAccountsUrl}/StudentFeeMaster/GetByParameters`, studentFeeMasterFilter);
    }

    getByRegistrationNumber(registrationNumber: string): Observable<any> {
        return this.http.get<any>(`${environment.apiAccountsUrl}/StudentFeeMaster/GetByRegistrationNumber/${registrationNumber}`);
    }

    getStudentFeeMasterSummaryList(academicSessionId: number, programId: number, operationalVerticalId: number): Observable<StudentFeeMasterSummary[]> {
        return this.http.get<StudentFeeMasterSummary[]>(`${environment.apiAccountsUrl}/StudentFeeMaster/GetStudentFeeMasterSummaryByAcademicSession/${academicSessionId}/Program/${programId}/OperationalVertical/${operationalVerticalId}`);
    }
}
