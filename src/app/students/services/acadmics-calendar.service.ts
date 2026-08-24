import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AcademicsCalendarService {

    constructor(private http: HttpClient) { }

    getAcademicsHoliday() {
        return this.http.get<any>(environment.apiStudentsUrl + '/AcademicHoliday/GetAll')
    }
}