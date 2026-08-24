import { BaseModel } from "../commons/base-model";

export class TimeSheetExpress extends BaseModel{
    employeeCode?: string;
    dayOfWeek?: string;
    date?: string;
    loggedInTime : any;
    loggedOutTime : any;
    regularHours?: any;
    meetingHours?: any;
    overtimeHours?: any;
    sickHours?: any;
    vacationHours?: any;
    holidayHours?: any;
    unpaidLeaveHours?: any;
    otherHours?: any;
    totalHours?: any;
}