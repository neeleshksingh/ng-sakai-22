import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StudentFeeMaster } from 'src/app/shared/models/finance-Pro/student-fee-master';
import { StudentFeeMasterRequest } from 'src/app/shared/models/finance-Pro/student-fee-master-request';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class StudentFeeMasterService {

    constructor(private http: HttpClient) { }

    getStudentFeeMasterList(studentFeeMastersRequests:StudentFeeMasterRequest[]) {
        return this.http.post<StudentFeeMaster[]>(environment.apiStudentsUrl + '/StudentFeeMaster/GetByParameters',studentFeeMastersRequests)
    }

    getStudentFeeMasterCommulativeByRegistrationNumber(registrationNumber:string) {
        return this.http.get<StudentFeeMaster[]>(environment.apiStudentsUrl + '/StudentFeeMaster/GetStudentFeeMasterCommulativeByRegistrationNumber/'+registrationNumber)
    }

    getStudentFeeMasterCommulativeByProgramId(academicSessionId:number,programId:number) {
        return this.http.get<StudentFeeMaster[]>(environment.apiStudentsUrl + '/StudentFeeMaster/GetStudentFeeMasterCommulativeByProgramId/'+academicSessionId+'/'+programId)
    }
}