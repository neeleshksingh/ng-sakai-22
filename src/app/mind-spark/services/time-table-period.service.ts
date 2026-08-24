import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TimeTablePeriod } from 'src/app/shared/models/commons/time-table-period';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TimeTablePeriodService {

  constructor(private http: HttpClient) { }

   getTimeTablePeriod() {
        return this.http.get<TimeTablePeriod[]>(environment.apiAcademicsUrl + '/TimeTablePeriod/GetAll');
    }
}
