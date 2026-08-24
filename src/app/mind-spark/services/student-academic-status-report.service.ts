import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ExaminationGradingSearch } from 'src/app/shared/models/knowledge-stand/examination-grading-search';
import { StudentAcademicReportResponse } from 'src/app/shared/models/knowledge-stand/student-academics-report';
import { environment } from 'src/environments/environment';


@Injectable({
    providedIn: 'root'
})
export class StudentAcademicStatusService {

    constructor(private http: HttpClient) { }

    getStudentAcademicReport(studentAcademicsReportSearch: ExaminationGradingSearch) {
        return this.http.post<StudentAcademicReportResponse>(environment.apiAcademicsUrl + '/StudentAcademicStatusReport/GetStudentAcademicStatusReportByStudentAcademicStatusSearchRequest',studentAcademicsReportSearch);
      }
}