import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StudentExaminationRegistration } from 'src/app/shared/models/knowledge-stand/student-examination-registration';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class StudentExaminationRegistrationService {

    constructor(private http: HttpClient) { }

    getStudentExaminationRegistrationData() {
        return this.http.get<StudentExaminationRegistration[]>(environment.apiStudentsUrl + '/StudentExaminationRegistration/GetStudentExaminationRegistrationData')
    }

    getStudentExaminationRegistrationDataByExaminationIdOVIdStudentId(examinationId: number, operationalVerticalId: number, studentId: string) {
        return this.http.get<StudentExaminationRegistration[]>(environment.apiStudentsUrl + '/StudentExaminationRegistration/GetStudentExaminationRegistrationData/v2/Examination/' 
        + examinationId + '/OperationalVertical/' + operationalVerticalId + '/StudentId/' + studentId)
    }

    getStudentBacklogExaminationRegistrationData(examinationId: number, registrationNumber: String) {
        return this.http.get<StudentExaminationRegistration[]>(environment.apiStudentsUrl + '/StudentExaminationRegistration/GetStudentExaminationRegistrationBacklogDataByExamination/' + examinationId + '/RegistrationNumber/' + registrationNumber)
    }

    addMultiple(studentExaminationRegistrations: StudentExaminationRegistration[]) {
        return this.http.post<StudentExaminationRegistration[]>(environment.apiStudentsUrl + '/StudentExaminationRegistration/AddMultiple', studentExaminationRegistrations);
    }
}