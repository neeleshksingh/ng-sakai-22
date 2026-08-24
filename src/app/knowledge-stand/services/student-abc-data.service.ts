import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StudentABCData } from 'src/app/shared/models/knowledge-stand/student-abc-data';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class StudentABCDataService{
    constructor(private http: HttpClient) { }
    getABCReportByAcademicSessionProgramOvExamination(academicSessionId: number, programId: number, operationalVerticalId: number, examinationId : number) {
        return this.http.get<StudentABCData[]>(environment.apiExaminationsUrl + '/ABC/GetByAcademicSession/' + academicSessionId + '/Program/' + programId + '/OperationalVertical/' + operationalVerticalId + '/Examination/' + examinationId);
    }

    getByStudentABCDataReport(request : any) {
        return this.http.post<StudentABCData[]>(environment.apiExaminationsUrl + '/ABC/GetByStudentABCDataRequest', request);
    }

    getStudentABCDataByStudentStatus(request : any, studentStatus : string) {
        return this.http.post<StudentABCData[]>(environment.apiExaminationsUrl + `/ABC/GetByStudentStatus/${studentStatus}/StudentABCDataRequest`, request);
    }

    getByStudentABCDataRequest(request : any){
        return this.http.post<StudentABCData[]>(environment.apiExaminationsUrl + '/ABC/GetByStudentABCDataRequest', request);
    }
}
