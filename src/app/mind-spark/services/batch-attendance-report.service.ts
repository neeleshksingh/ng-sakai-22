import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BatchAttendancePercentage } from "src/app/shared/models/mindspark/batch-attendance-percentage";
import { BatchAttendanceReport } from "src/app/shared/models/mindspark/batch-attendance-report";
import { FacultyBatchAttendanceMatrixExpando } from "src/app/shared/models/mindspark/faculty-batch-attendance-matrix-expando";
import { FacultyBatchAttendanceMatrixSearchRequest } from "src/app/shared/models/mindspark/faculty-batch-attendance-matrix-search-request";
import { environment } from 'src/environments/environment';


@Injectable({
    providedIn: 'root'
})
export class BatchAttendanceReportService {

    constructor(private http: HttpClient) { }
    getBatchAttendanceByBatchCode(batchCode: string) {
        return this.http.get<BatchAttendanceReport>(environment.apiAcademicsUrl + '/BatchAttendance/GetBatchAttendanceByBatchCode/' + batchCode)
    };

    GetFacultyBatchAttendanceMatrixExpandoByAcademicSessionIds(facultyBatchAttendanceMatrixSearchRequest: FacultyBatchAttendanceMatrixSearchRequest) {
        return this.http.post<FacultyBatchAttendanceMatrixExpando>(environment.apiAcademicsUrl + '/BatchAttendance/GetFacultyBatchAttendanceMatrixExpandoByAcademicSessionIds', facultyBatchAttendanceMatrixSearchRequest);
    }

    getBatchAttendancePercentageByBatchCode(batchCode: string) {
        return this.http.get<BatchAttendancePercentage[]>(environment.apiAcademicsUrl + '/BatchAttendance/GetBatchAttendancePercentageByBatchCode/' + batchCode);
    }
    getPendingBatchAttendanceByFacultyCode(facultyCode:string){
        return this.http.get<any[]>(environment.apiAcademicsUrl+ `/BatchAttendance/GetPendingBatchAttendanceByFacultyCode/${facultyCode}`)
    }
    getBatchAttendanceReportForRunningSemesters(){
        return this.http.get<any[]>(environment.apiAcademicsUrl+ `/BatchAttendance/GetBatchAttendanceReportForRunningSemesters`)
    }
}