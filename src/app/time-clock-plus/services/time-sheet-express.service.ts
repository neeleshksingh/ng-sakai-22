import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TimeSheetExpress } from 'src/app/shared/models/TimeClockPlus/timesheet-express';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class TimesheetExpressService {

    constructor(private http: HttpClient) { }
 
    getEmployeeTimesheetByEmployeeCodeDateRange(dateRange : any, employeeCode: string) {
        return this.http.post<any[]>(environment.apiTimeClockPlusUrl + '/EmployeeTimesheet/GetByEmployeeCodeDateRange/' + employeeCode, dateRange ) 
    }

    addEmployeeTimesheet(timesheetExpress : TimeSheetExpress[]){
        return this.http.post<TimeSheetExpress[]>(environment.apiTimeClockPlusUrl + '/EmployeeTimesheet/AddMultiple', timesheetExpress )
    }

    getEmployeeTimesheetWorkFlowByApproverEmployeeCode(dateRange : any, employeeCode: string){
        return this.http.post<any[]>(environment.apiTimeClockPlusUrl + '/EmployeeTimesheet/GetEmployeeTimesheetWorkFlowByApproverEmployeeCode/' + employeeCode, dateRange)
    }

    addEmployeeTimesheetWorkflow(timesheetWorkflowDetails : any[]){
        return this.http.post<any[]>(environment.apiTimeClockPlusUrl + '/EmployeeTimesheet/AddEmployeeTimesheetWorkFlows', timesheetWorkflowDetails)
    }

    getEmployeeTimesheetWorkflowByReporteeEmployeeCode(empCode:string, dateRange:any){
        return this.http.post<any[]>(environment.apiTimeClockPlusUrl + '/EmployeeTimesheet/GetEmployeeTimesheetWorkFlowByEmployeeCode/' + empCode, dateRange)
    }
}