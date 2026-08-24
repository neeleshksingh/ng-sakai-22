import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { BehaviorSubject, Observable } from 'rxjs';
import { BatchAttendance, BatchAttendanceData } from 'src/app/shared/models/mindspark/batch-attendance';
import { BatchAttendancePending } from 'src/app/shared/models/mindspark/batch-attendance-pending';
import { BatchAttendancePercentage } from 'src/app/shared/models/mindspark/batch-attendance-percentage';
import { BatchAttendanceToUdateData } from 'src/app/shared/models/mindspark/batch-attendance-to-update';
import { FacultyBatchAttendance } from 'src/app/shared/models/mindspark/faculty-batch-attendance';
import { StudentBatchAttendance } from 'src/app/shared/models/mindspark/student-batch-attendance';
import { StudentBatchAttendanceSummaryDataResponse } from 'src/app/shared/models/mindspark/student-batch-attendance-report';
import { GenericService } from 'src/app/shared/services/generic.service';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class BatchAttendanceService extends GenericService<BatchAttendance, BatchAttendance> {
    constructor(http: HttpClient, messageService: MessageService) {
        super(http, messageService, "BatchAttendance", environment.apiAcademicsUrl);
    }

    private studentBatchAttendanceSummarySubject = new BehaviorSubject<StudentBatchAttendanceSummaryDataResponse>(new StudentBatchAttendanceSummaryDataResponse());
    private studentBatchAttendanceSubject = new BehaviorSubject<StudentBatchAttendance[]>([]);

    getPendingAttendanceByBatchCode(batchCode: string): Observable<BatchAttendanceData> {
        return this.http.get<BatchAttendanceData>(`${environment.apiAcademicsUrl}/BatchAttendance/GetPendingAttendanceByBatchCode/${batchCode}`);
    }

    getBatchAttendancePendingList(): Observable<BatchAttendancePending[]> {
        return this.http.get<BatchAttendancePending[]>(`${environment.apiAcademicsUrl}/BatchAttendance/GetBatchAttendancePending`);
    }

    getByBatchAttendanceCode(batchAttendanceCode: string): Observable<BatchAttendance> {
        return this.http.get<BatchAttendance>(`${environment.apiAcademicsUrl}/BatchAttendance/GetByBatchAttendanceCode/${batchAttendanceCode}`);
    }

    getByBatchAttendancePendingByAcademicSessionId(academicSessionId: number): Observable<BatchAttendancePending[]> {
        return this.http.get<BatchAttendancePending[]>(`${environment.apiAcademicsUrl}/BatchAttendance/GetBatchAttendancePendingByAcademicSession/${academicSessionId}`);
    }

    getBatchAttendanceByTerm(batchAttendanceTerm: string): Observable<BatchAttendance[]> {
        return this.http.get<BatchAttendance[]>(`${environment.apiAcademicsUrl}/BatchAttendance/GetByTerms/${batchAttendanceTerm}`);
    }

    SendMessageBatchAttendanceUpdateStatusByBatchCodeCycle(batchCode: any, cycle: any): Observable<any> {
        return this.http.get(`${environment.apiAcademicsUrl}/BatchAttendance/SendMessageBatchAttendanceUpdateStatusByBatchCodeCycle/${batchCode}/Cycle/${cycle}`);
    }

    getBatchAttendanceByBatchCode(batchCode: string, cycle: string): Observable<BatchAttendanceToUdateData> {
        return this.http.get<BatchAttendanceToUdateData>(`${environment.apiAcademicsUrl}/BatchAttendance/GetBatchAttendanceByBatchCode/${batchCode}/Cycle/${cycle}`);
    }

    getBatchAttendancePendingBySearchRequest(request: any): Observable<BatchAttendanceToUdateData> {
        return this.http.get<BatchAttendanceToUdateData>(`${environment.apiAcademicsUrl}/BatchAttendance/GetBatchAttendanceBy`);
    }

    getBatchAttendancePercentageByAcademicSession(academicSessionId: number, programId: number, operationalVerticalId: number): Observable<BatchAttendancePercentage[]> {
        return this.http.get<BatchAttendancePercentage[]>(`${environment.apiAcademicsUrl}/BatchAttendance/GetBatchAttendancePercentageByAcademicSession/${academicSessionId}/Program/${programId}/OperationalVertical/${operationalVerticalId}`);
    }

    getBatchAttendancePivotByAcademicSession(academicSessionId: number, programId: number, operationalVerticalId: number): Observable<any> {
        return this.http.get<any>(`${environment.apiAcademicsUrl}/BatchAttendance/GetBatchAttendancePivotByAcademicSession/${academicSessionId}/Program/${programId}/OperationalVertical/${operationalVerticalId}`);
    }

    getBatchAttendancePercentageByBatchCode(batchCode: string): Observable<BatchAttendancePercentage[]> {
        return this.http.get<BatchAttendancePercentage[]>(`${environment.apiAcademicsUrl}/BatchAttendance/GetBatchAttendancePercentageByBatchCode/${batchCode}`);
    }

    getBatchAttendancePercentageByRegistrationNumber(registrationNumber: string): Observable<BatchAttendancePercentage[]> {
        return this.http.get<BatchAttendancePercentage[]>(`${environment.apiAcademicsUrl}/BatchAttendance/GetBatchAttendancePercentageByRegistrationNumber/${registrationNumber}`);
    }

    getBatchAttendancePendingBy(request: any): Observable<BatchAttendanceToUdateData> {
        return this.http.get<BatchAttendanceToUdateData>(`${environment.apiAcademicsUrl}/BatchAttendance/GetBatchAttendanceBy`);
    }

    GetStudentBatchAttendanceSummaryDataExpandoByStudentId(studentId: string): Observable<StudentBatchAttendanceSummaryDataResponse> {
        return this.http.get<StudentBatchAttendanceSummaryDataResponse>(
            `${environment.apiGlobalUrl}/BatchAttendance/GetStudentBatchAttendanceSummaryDataExpandoByStudentId/${studentId}`
        );
    }

    getBatchAttendanceByStudentId(studentId: string, last: number): Observable<StudentBatchAttendance[]> {
        return this.http.get<StudentBatchAttendance[]>(
            `${environment.apiGlobalUrl}/BatchAttendance/GetBatchAttendanceByStudentId/${studentId}/Last/${last}`
        );
    }

    get studentBatchAttendanceSummaryDataResponse(): Observable<StudentBatchAttendanceSummaryDataResponse> {
        return this.studentBatchAttendanceSummarySubject.asObservable();
    }

    get studentBatchAttendance(): Observable<StudentBatchAttendance[]> {
        return this.studentBatchAttendanceSubject.asObservable();
    }

    getBatchAttendanceByBatchAttendanceSearchRequest(payload: any) {
        return this.http.post<BatchAttendance[]>(`${environment.apiAcademicsUrl}/BatchAttendance/GetByBatchAttendanceSearchRequest`, payload);
    }

    getBatchAttendancePivotByBatchAttendanceSearchRequest(payload: any): Observable<any> {
        return this.http.post<any>(`${environment.apiAcademicsUrl}/BatchAttendance/GetPivotByBatchAttendanceSearchRequest`, payload);
    }

    getBatchAttendancePivotRunningByFacultyCode(facultyCode: string) {
        return this.http.post<FacultyBatchAttendance[]>(`${environment.apiAcademicsUrl}/BatchAttendance/GetBatchAttendancePivotRunningByFacultyCode/` + facultyCode, null);
    }

    getFacultySubjectAllocationByFacultyCodeActive(facultyCode: string) {
        return this.http.get<FacultyBatchAttendance[]>(`${environment.apiAcademicsUrl}/FacultySubjectAllocation/GetByFacultyCode/${facultyCode}/active`);
    }
}