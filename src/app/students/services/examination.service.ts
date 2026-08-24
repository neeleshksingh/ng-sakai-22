import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Examination } from 'src/app/shared/models/knowledge-stand/examination';
import { StudentExaminationByAcadmicSession } from 'src/app/shared/models/students/student-examination-by-acadmic-session';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ExaminationService {

    constructor(private http: HttpClient) { }

    getActiveExaminations(){
        return this.http.get<any[]>(environment.apiStudentsUrl + '/Examination/GetActiveExaminations')
    }

    getActiveExaminationsForFormSubmission(){
        return this.http.get<any[]>(environment.apiStudentsUrl + '/Examination/GetActiveExaminationsForFormSubmission')
    }

    getByIntId(id: number) {
        return this.http.get<Examination>(environment.apiStudentsUrl + '/Examination/GetByIntId/' + id)
    }

    getActiveExaminationByAcadmicSession(academicId: number, programId: number, operationalVerticalId: number, studentId: string) {
        return this.http.get<StudentExaminationByAcadmicSession[]>(environment.apiStudentsUrl +
            '/Examination/GetActiveExaminationByAcadmicSession/' + academicId + '/Program/' + programId + '/OperationalVertical/' + operationalVerticalId);
    }

    getActiveExaminationsForFormSubmissionByRegistrationNumber(registrationNumber: string) {
        return this.http.get<any[]>(environment.apiStudentsUrl + '/Examination/GetActiveExaminationsForFormSubmissionByRegistrationNumber/' + registrationNumber);
    }
}
