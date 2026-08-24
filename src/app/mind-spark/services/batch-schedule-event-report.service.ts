import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BatchScheduleEventData } from "src/app/shared/models/mindspark/batch-schedule-event";
import { BatchScheduleReports } from "src/app/shared/models/mindspark/batch-schedule-reports";
import { environment } from 'src/environments/environment';


@Injectable({
    providedIn: 'root'
})
export class BatchScheduleEventReportService{

    constructor(private http: HttpClient) { }
    getBatchScheduleReportsByBatchCode​(batchCode: string) {
        return this.http.get<BatchScheduleReports[]>(environment.apiAcademicsUrl + '/BatchSchedule/GetBatchScheduleReportsByBatchCode/'+batchCode)
    };

    getBatchScheduleReportsByFacultyCode(facultyCode: string) {
        return this.http.get<BatchScheduleReports[]>(environment.apiAcademicsUrl + '/BatchSchedule/GetBatchScheduleReportsByFacultyCode/'+facultyCode)
    };

    getBatchScheduleEventsByFacultyCode(facultyCode: string) {
        return this.http.get<BatchScheduleEventData>(environment.apiAcademicsUrl + '/BatchSchedule/GetBatchScheduleEventsByFacultyCode/'+facultyCode)
    };

    getBatchScheduleReportsByRegistrationNumber(registrationNumber: string) {
        return this.http.get<any[]>(environment.apiAcademicsUrl + '/BatchSchedule/GetBatchScheduleReportsByRegistrationNumber/'+registrationNumber)
    };

    getBatchScheduleEventsByRegistrationNumber(registrationNumber: string) {
        return this.http.get<any[]>(environment.apiAcademicsUrl + '/BatchSchedule/GetBatchScheduleEventsByRegistrationNumber/'+registrationNumber)
    };
   }