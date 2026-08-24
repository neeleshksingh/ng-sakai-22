import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ExaminationRegistrationSearch, StudentExaminationRegistration } from 'src/app/shared/models/knowledge-stand/student-examination-registration';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class StudentExaminationRegistrationService {

    constructor(private http: HttpClient) { }

    getStudentExaminationRegistrationDataAdminByStudentId(studentId: string) {
        return this.http.get<StudentExaminationRegistration[]>(environment.apiExaminationsUrl + '/StudentExaminationRegistration/GetStudentExaminationRegistrationDataAdminByStudentId/' + studentId);
    }
    
    addMultiple(studentExaminationRegistrations: StudentExaminationRegistration[]) {
        return this.http.post<StudentExaminationRegistration[]>(environment.apiExaminationsUrl + '/StudentExaminationRegistration/AddMultiple', studentExaminationRegistrations);
    }

    getStudentExaminationRegistrationByRegistrationNumber(registrationNumber: string) {
        return this.http.get<StudentExaminationRegistration[]>(environment.apiExaminationsUrl + '/StudentExaminationRegistration/GetByRegistrationNumber/' + registrationNumber);
    }

    getStudentExaminationRegistrationByExaminationId(examinationId: number){
        return this.http.get<StudentExaminationRegistration[]>(environment.apiExaminationsUrl + '/StudentExaminationRegistration/GetByExaminationId/' + examinationId);
    }

    getStudentExaminationRegistrationCountByExaminationId(examinationId: number){
        return this.http.get<any>(environment.apiExaminationsUrl + '/StudentExaminationRegistration/GetCountByExaminationId/' + examinationId);
    }

    getStudentExaminationRegistrationDataByExaminationBatchCode(examinationId : number, batchCode : string) {
        return this.http.get<StudentExaminationRegistration[]>(environment.apiExaminationsUrl +
            '/StudentExaminationRegistration/GetStudentExaminationRegistrationByExamination/' + examinationId + '/BatchCode/'+ batchCode );
    }

    getStudentExaminationRegistrationDataByExamination(studentExaminationRegistrationSearch: ExaminationRegistrationSearch) {
        return this.http.post<StudentExaminationRegistration[]>(environment.apiExaminationsUrl +
            '/StudentExaminationRegistration/GetStudentExaminationRegistrationDataByExamination/' +
            studentExaminationRegistrationSearch.examinationId + '/AcademicSession/'
            + studentExaminationRegistrationSearch.academicSessionId + '/Program/'
            + studentExaminationRegistrationSearch.programId + '/OperationalVertical/'
            + studentExaminationRegistrationSearch.operationalVerticalId, null);
    }
}
