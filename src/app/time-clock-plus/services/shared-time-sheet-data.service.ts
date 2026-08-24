import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TimesheetSharedService {
  private timesheetData: any;

  setTimesheetData(data: any) {
    this.timesheetData = data;
  }

  getTimesheetData(): any {
    return this.timesheetData;
  }
}