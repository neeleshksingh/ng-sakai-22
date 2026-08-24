import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ExaminationAttendance } from 'src/app/shared/models/knowledge-stand/examination-attendance';
import { ExaminationAttendanceBatchCodeWise } from 'src/app/shared/models/knowledge-stand/examination-attendance-batch-code-wise';
import { ExaminationAttendanceRequest } from 'src/app/shared/models/knowledge-stand/examination-attendance-request';
import { environment } from 'src/environments/environment';


@Injectable({
    providedIn: 'root'
})
export class ExaminationAttendanceService {

    constructor(private http: HttpClient) { }

    prepareExaminationAttendanceByAttendanceRequest(examinationAttendanceRequest: ExaminationAttendanceRequest) {
        return this.http.post<ExaminationAttendance[]>(environment.apiExaminationsUrl + '/ExaminationAttendance/GetExaminationAttendanceDataByAttendanceRequest', examinationAttendanceRequest);
    }

    addMultiples(examinationAttendances: ExaminationAttendance[]) {
        return this.http.post<ExaminationAttendance[]>(environment.apiExaminationsUrl + '/ExaminationAttendance/AddMultiple', examinationAttendances);
    }

    getExaminationAttendanceData(examinationAttendanceBatchCodeWise: ExaminationAttendanceBatchCodeWise) {
        return this.http.get<ExaminationAttendance[]>(environment.apiExaminationsUrl + '/ExaminationAttendance/GetExaminationAttendanceData/Examination/' + examinationAttendanceBatchCodeWise.examinationId + '/BatchCode/' + examinationAttendanceBatchCodeWise.batchCode);
    }
    getByBatchCode(batchCode: string) {
        return this.http.get<any>(environment.apiExaminationsUrl + '/Batch/GetByBatchCode/' + batchCode);
    }
    getExaminationAttendanceByExaminationIdAndBatchCode(examinationId: number, batchCode: string,) {
        return this.http.get<any>(environment.apiExaminationsUrl + '/ExaminationAttendance/GetExaminationAttendance/Examination/'+examinationId+'/BatchCode/'+batchCode);
    }
}