import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountGroupLedgerSummary } from 'src/app/shared/models/finance-Pro/account-group-ledger-summary';
import { AccountGroupList } from 'src/app/shared/models/finance-Pro/account-group-list';
import { AccountGroupVoucherSummary } from 'src/app/shared/models/finance-Pro/account-group-voucher-summary';
import { AccountLedger } from 'src/app/shared/models/finance-Pro/account-ledger';
import { AccountLedgerVoucherSummary } from 'src/app/shared/models/finance-Pro/account-ledger-voucher-summary';
import { CollectionReport } from 'src/app/shared/models/finance-Pro/collection-report';
import { DailyCollectionReport } from 'src/app/shared/models/finance-Pro/daily-collection-report';
import { DailyCollectionReportRequest } from 'src/app/shared/models/finance-Pro/daily-collection-report-request';
import { DefaulterListReport } from 'src/app/shared/models/finance-Pro/defaulter-list-report';
import { DefaulterListReportRequest } from 'src/app/shared/models/finance-Pro/defaulter-list-report-request';
import { StatisticsReport } from 'src/app/shared/models/finance-Pro/statistics-report';
import { StudentFeeConcessionReport } from 'src/app/shared/models/finance-Pro/student-fee-concession-report';
import { StudentFeeConcessionRequest } from 'src/app/shared/models/finance-Pro/student-fee-concession-request';
import { StudentFeeLedgerExpando } from 'src/app/shared/models/finance-Pro/student-fee-ledger-report';
import { StudentFeeMaster } from 'src/app/shared/models/finance-Pro/student-fee-master';
import { StudentFeeMasterRequest } from 'src/app/shared/models/finance-Pro/student-fee-master-request';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class ReportsService {
    constructor(private http: HttpClient) { }

    getStudentFeeMasterRequest(
        studentFeeMasterRequest: StudentFeeMasterRequest
    ): Observable<StudentFeeMaster[]> {
        return this.http.post<StudentFeeMaster[]>(
            environment.apiAccountsUrl + '/Reports/GetStudentFeeMasterByStudentFeeMasterRequest',
            studentFeeMasterRequest
        );
    }

    getStudentFeeConcessionReportByStudentFeeConcessionRequest(
        studentFeeConcessionRequest: StudentFeeConcessionRequest
    ): Observable<StudentFeeConcessionReport[]> {
        return this.http.post<StudentFeeConcessionReport[]>(
            environment.apiAccountsUrl + '/Reports/GetStudentFeeConcessionReportByStudentFeeConcessionRequest',
            studentFeeConcessionRequest
        );
    }

    getDailyCollectionReportByDailyCollectionReportRequest(
        dailyCollectionReportRequest: DailyCollectionReportRequest
    ): Observable<DailyCollectionReport[]> {
        return this.http.post<DailyCollectionReport[]>(
            environment.apiAccountsUrl + '/Reports/GetDailyCollectionReportByDailyCollectionReportRequest',
            dailyCollectionReportRequest
        );
    }

    getDailyCollectionFeeComponentWiseReportByDailyCollectionReportRequest(
        dailyCollectionReportRequest: DailyCollectionReportRequest
    ): Observable<DailyCollectionReport[]> {
        return this.http.post<DailyCollectionReport[]>(
            environment.apiAccountsUrl + '/Reports/GetDailyCollectionFeeComponentWiseReportByDailyCollectionReportRequest',
            dailyCollectionReportRequest
        );
    }

    getStudentFeeLedgerExpandoByRegistrationNumber(
        registrationNumber: string
    ): Observable<StudentFeeLedgerExpando> {
        return this.http.get<StudentFeeLedgerExpando>(
            environment.apiAccountsUrl + '/Reports/GetStudentFeeLedgerExpandoByRegistrationNumber/' + registrationNumber
        );
    }

    downloadStudentFeeLedgerExpandoByRegistrationNumber(
        registrationNumber: string
    ): Observable<any> {
        return this.http.get<any>(
            environment.apiAccountsUrl + '/Reports/DownloadStudentFeeLedgerByRegistrationNumber/' + registrationNumber
        );
    }

    getDefaulterListReportByDefaulterListReportRequest(
        defaulterListReportRequest: DefaulterListReportRequest
    ): Observable<DefaulterListReport[]> {
        return this.http.post<DefaulterListReport[]>(
            environment.apiAccountsUrl + '/Reports/GetDefaulterListReportByDefaulterListReportRequest',
            defaulterListReportRequest
        );
    }

    getDailyCollectionFeeComponentWisePivotReportByDailyCollectionReportRequest(
        dailyCollectionReportRequest: DailyCollectionReportRequest
    ): Observable<any> {
        return this.http.post<any>(
            environment.apiAccountsUrl + '/Reports/GetDailyCollectionFeeComponentWisePivotReportByDailyCollectionReportRequest',
            dailyCollectionReportRequest
        );
    }

    getCollectionReport(): Observable<CollectionReport[]> {
        return this.http.get<CollectionReport[]>(
            environment.apiAccountsUrl + '/Reports/GetCollectionReport'
        );
    }

    getDailyCollectionReportExpandoByDailyCollectionReportRequest(
        dailyCollectionReportRequest: any
    ): Observable<any> {
        return this.http.post<any>(
            environment.apiAccountsUrl + '/Reports/GetDailyCollectionReportExpandoByDailyCollectionReportRequest',
            dailyCollectionReportRequest
        );
    }

    downloadHtmlStudentFeeLedgerExpandoByRegistrationNumber(registrationNumber: string) {
        return this.http.get<any>(environment.apiAccountsUrl + '/Reports/DownloadHtmlStudentFeeLedgerExpandoByRegistrationNumber/' + registrationNumber);
    }

    getStatementofAccountGroupList() {
        return this.http.get<AccountGroupList[]>(environment.apiAccountsUrl + '/Reports/GetStatementofAccounts/AccountGroupList');
    }

    getStatementofAccountLedgers() {
        return this.http.get<AccountLedger[]>(environment.apiAccountsUrl + '/Reports/GetStatementofAccounts/AccountLedgers');
    }

    getStatementofAccountLedgersUnused() {
        return this.http.get<AccountLedger[]>(environment.apiAccountsUrl + '/Reports/GetStatementofAccounts/AccountLedgersUnused');
    }

    getAccountGroupLedgerSummaryByAccountGroupId(accountGroupId: number, dateRange: any) {
        return this.http.post<AccountGroupLedgerSummary>(environment.apiAccountsUrl + '/Reports/GetStatementofAccounts/AccountGroupLedgerSummaryByAccountGroupId/' + accountGroupId + '/DateRange', dateRange);
    }

    getAccountGroupVoucherSummaryByAccountGroupId(accountGroupId: number, dateRange: any) {
        return this.http.post<AccountGroupVoucherSummary>(environment.apiAccountsUrl + '/Reports/GetStatementofAccounts/AccountGroupVoucherSummaryByAccountGroupId/' + accountGroupId + '/DateRange', dateRange);
    }

    getAccountLedgerVoucherSummaryByAccountLedgerId(accountLedgerId: number, dateRange: any) {
        return this.http.post<AccountLedgerVoucherSummary>(environment.apiAccountsUrl + '/Reports/GetStatementofAccounts/AccountLedgerVoucherSummaryByAccountLedgerId/' + accountLedgerId + '/DateRange', dateRange);
    }

    getStatisticsReport(dateRange: any) {
        return this.http.post<StatisticsReport>(environment.apiAccountsUrl + '/Reports/GetStatementofAccounts/StatisticsReport', dateRange);
    }
}