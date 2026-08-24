import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AcademicSessionProgram } from 'src/app/shared/models/cloudbytes/academic-session-program';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AcademicSessionProgramService {

    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<AcademicSessionProgram[]>(environment.apiStudentsUrl + '/AcademicSessionProgram/GetAll')
    }
}