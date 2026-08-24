import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StudentBatchAttendanceSummaryDataResponse } from 'src/app/shared/models/mindspark/student-batch-attendance-report';
import { BatchAttendance } from 'src/app/shared/models/students/batch-attendance';

import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class BatchAttendanceService {

    constructor(private http: HttpClient) { }

    getBatchAttendanceByRegistrationNumber(registrationNumber: string) {
        return this.http.get<BatchAttendance[]>(environment.apiStudentsUrl + '/AcademicsReports/GetBatchAttendanceByRegistrationNumber/' + registrationNumber)
    }

    getStudentBatchAttendanceSummaryDataExpandoByStudentId(studentId: string) {
        return this.http.get<StudentBatchAttendanceSummaryDataResponse>(environment.apiStudentsUrl 
            + '/BatchAttendance/GetStudentBatchAttendanceSummaryDataExpandoByStudentId/' + studentId);
    }
    getByRegistrationNumber(registrationNumber: string) {
        return this.http.get<BatchAttendance[]>(environment.apiStudentsUrl 
            + '/BatchAttendance/GetByRegistrationNumber/' + registrationNumber);
    }
}