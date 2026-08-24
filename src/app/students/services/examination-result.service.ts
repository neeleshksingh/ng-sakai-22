import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StudentExaminationResultStudentWise } from 'src/app/shared/models/knowledge-stand/student-examination-result-student-wise';
import { StudentExaminationResponse } from 'src/app/shared/models/students/student-examination-response';
import { StudentExaminationResultResponse } from 'src/app/shared/models/students/student-examination-result-response';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ExaminationResultService {

    constructor(private http: HttpClient) { }

    studentExaminationResponse: StudentExaminationResponse = {};
    getStudentSubjectPaperCodeMarksList(studentExaminationResultStudentWise: StudentExaminationResultStudentWise) {
        return this.http.post<StudentExaminationResultResponse>(environment.apiStudentsUrl + '/ExaminationResult/GetByExaminationResultStudentWiseSearchRequest',
            studentExaminationResultStudentWise);
    }
    getStudentExamination(studentId : string) {
        return this.http.get<StudentExaminationResponse>(environment.apiStudentsUrl + '/Examination/GetByStudentId/' + studentId);
    }
    downloadByExaminationResultStudentWiseSearchRequest(studentExaminationResultStudentWise: StudentExaminationResultStudentWise) {
        return this.http.post<any>(environment.apiStudentsUrl + '/ExaminationResult/DownloadByExaminationResultStudentWiseSearchRequest',
            studentExaminationResultStudentWise);
    }

    getByExaminationResultStudentWiseSearchRequest(studentExaminationResultStudentWise: StudentExaminationResultStudentWise) {
        return this.http.post<any>(environment.apiStudentsUrl + '/ExaminationResult/GetByExaminationResultStudentWiseSearchRequest',
            studentExaminationResultStudentWise);
    }

}