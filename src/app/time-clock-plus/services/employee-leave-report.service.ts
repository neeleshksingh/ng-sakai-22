import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EmployeeLeaveReport } from 'src/app/shared/models/TimeClockPlus/employee-leave-report-request';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class EmployeeLeaveReportService {
    private readonly baseUrl = `${environment.apiTimeClockPlusUrl}/EmployeeLeaveReport`;

    constructor(private http: HttpClient) {}

    getEmployeeLeaveRegisterReportByLeaveReportFilter(
        payload: EmployeeLeaveReport,
    ): Observable<any> {
        return this.http.post<any>(
            `${this.baseUrl}/GetEmployeeLeaveRegisterReportByLeaveReportFilter`,
            payload,
        );
    }

    getLeaveBalanceReportByLeaveReportFilter(
        payload: EmployeeLeaveReport,
    ): Observable<any> {
        return this.http.post<any>(
            `${this.baseUrl}/GetLeaveBalanceReportByLeaveReportFilter`,
            payload,
        );
    }

    getDepartmentLeaveSummaryByLeaveReportFilter(
        payload: EmployeeLeaveReport,
    ): Observable<any> {
        return this.http.post<any>(
            `${this.baseUrl}/GetDepartmentLeaveSummaryByLeaveReportFilter`,
            payload,
        );
    }

    getDailyLeaveReportByLeaveReportFilter(
        payload: EmployeeLeaveReport,
    ): Observable<any> {
        return this.http.post<any>(
            `${this.baseUrl}/GetDailyLeaveReportByLeaveReportFilter`,
            payload,
        );
    }

    getMonthlyLeaveReportByLeaveReportFilter(
        payload: EmployeeLeaveReport,
    ): Observable<any> {
        return this.http.post<any>(
            `${this.baseUrl}/GetMonthlyLeaveReportByLeaveReportFilter`,
            payload,
        );
    }

    getPendingLeaveApprovalReportByLeaveReportFilter(
        payload: EmployeeLeaveReport,
    ): Observable<any> {
        return this.http.post<any>(
            `${this.baseUrl}/GetPendingLeaveApprovalReportByLeaveReportFilter`,
            payload,
        );
    }

    getLeaveWithoutPayReportByLeaveReportFilter(
        payload: EmployeeLeaveReport,
    ): Observable<any> {
        return this.http.post<any>(
            `${this.baseUrl}/GetLeaveWithoutPayReportByLeaveReportFilter`,
            payload,
        );
    }

    getLeaveEncashmentReportByLeaveReportFilter(
        payload: EmployeeLeaveReport,
    ): Observable<any> {
        return this.http.post<any>(
            `${this.baseUrl}/GetLeaveEncashmentReportByLeaveReportFilter`,
            payload,
        );
    }

    getAttendanceVsLeaveReportByLeaveReportFilter(
        payload: EmployeeLeaveReport,
    ): Observable<any> {
        return this.http.post<any>(
            `${this.baseUrl}/GetAttendanceVsLeaveReportByLeaveReportFilter`,
            payload,
        );
    }

    getFacultyAvailabilityReportByLeaveReportFilter(
        payload: EmployeeLeaveReport,
    ): Observable<any> {
        return this.http.post<any>(
            `${this.baseUrl}/GetFacultyAvailabilityReportByLeaveReportFilter`,
            payload,
        );
    }

    getHolidayLeaveClashReportByLeaveReportFilter(
        payload: EmployeeLeaveReport,
    ): Observable<any> {
        return this.http.post<any>(
            `${this.baseUrl}/GetHolidayLeaveClashReportByLeaveReportFilter`,
            payload,
        );
    }

    getLeaveAuditReportByLeaveReportFilter(
        payload: EmployeeLeaveReport,
    ): Observable<any> {
        return this.http.post<any>(
            `${this.baseUrl}/GetLeaveAuditReportByLeaveReportFilter`,
            payload,
        );
    }

    getLeaveDashboardReportByLeaveReportFilter(
        payload: EmployeeLeaveReport,
    ): Observable<any> {
        return this.http.post<any>(
            `${this.baseUrl}/GetLeaveDashboardReportByLeaveReportFilter`,
            payload,
        );
    }

    getLeaveLiabilityReportByLeaveReportFilter(
        payload: EmployeeLeaveReport,
    ): Observable<any> {
        return this.http.post<any>(
            `${this.baseUrl}/GetLeaveLiabilityReportByLeaveReportFilter`,
            payload,
        );
    }

    getLeaveTrendReportByLeaveReportFilter(
        payload: EmployeeLeaveReport,
    ): Observable<any> {
        return this.http.post<any>(
            `${this.baseUrl}/GetLeaveTrendReportByLeaveReportFilter`,
            payload,
        );
    }

    getLeaveTypeUtilizationReportByLeaveReportFilter(
        payload: EmployeeLeaveReport,
    ): Observable<any> {
        return this.http.post<any>(
            `${this.baseUrl}/GetLeaveTypeUtilizationReportByLeaveReportFilter`,
            payload,
        );
    }

    postByEndpoint(
        endpoint: string,
        payload: EmployeeLeaveReport,
    ): Observable<any> {
        return this.http.post<any>(`${this.baseUrl}/${endpoint}`, payload);
    }

    buildPayload(filters: EmployeeLeaveReport): EmployeeLeaveReport {
        const payload: EmployeeLeaveReport = {
            leaveYearId: null,
            departmentId: null,
            designationId: null,
            employeeTypeId: null,
            employeeCode: null,
            leaveTypeId: null,
            leaveStatus: null,
            approvalLevelId: null,
            fromDate: null,
            toDate: null,
        };

        payload.leaveYearId = this.toNullableNumber(filters?.leaveYearId);
        payload.departmentId = this.toNullableNumber(filters?.departmentId);
        payload.designationId = this.toNullableNumber(filters?.designationId);
        payload.employeeTypeId = this.toNullableNumber(filters?.employeeTypeId);
        payload.employeeCode = this.toNullableString(filters?.employeeCode);
        payload.leaveTypeId = this.toNullableNumber(filters?.leaveTypeId);
        payload.leaveStatus = this.toNullableString(filters?.leaveStatus);
        payload.approvalLevelId = this.toNullableNumber(
            filters?.approvalLevelId,
        );
        payload.fromDate = this.toNullableDateTime(filters?.fromDate);
        payload.toDate = this.toNullableDateTime(filters?.toDate);

        return payload;
    }

    private toNullableNumber(value: any): number | null {
        if (value === null || value === undefined || value === '') {
            return null;
        }

        const parsed = Number(value);
        return Number.isNaN(parsed) ? null : parsed;
    }

    private toNullableString(value: any): string | null {
        if (value === null || value === undefined) {
            return null;
        }

        const text = String(value).trim();
        return text ? text : null;
    }

    private toNullableDateTime(value: any): string | null {
        if (!value) {
            return null;
        }

        const date = value instanceof Date ? value : new Date(value);
        if (Number.isNaN(date.getTime())) {
            return null;
        }

        return this.toIsoDateTimeString(date);
    }

    private toIsoDateTimeString(date: Date): string {
        const year = date.getFullYear();
        const month = `${date.getMonth() + 1}`.padStart(2, '0');
        const day = `${date.getDate()}`.padStart(2, '0');
        const hours = `${date.getHours()}`.padStart(2, '0');
        const minutes = `${date.getMinutes()}`.padStart(2, '0');
        const seconds = `${date.getSeconds()}`.padStart(2, '0');

        return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
    }
}
