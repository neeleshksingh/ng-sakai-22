import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Faculty } from 'src/app/shared/models/cloudbytes/faculty';
import { environment } from 'src/environments/environment';


@Injectable({
    providedIn: 'root'
})
export class FacultyService {

    constructor(private http: HttpClient) { }
    getEmployeeJoiningDetailAllowedClassAndLab() {
        return this.http.get<Faculty[]>(environment.apiAcademicsUrl + '/Faculty/GetEmployeeJoiningDetailAllowedClassAndLab');
    }
}