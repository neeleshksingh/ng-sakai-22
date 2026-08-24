import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OperationalVerticalSubject } from 'src/app/shared/models/students/operational-vertical-subject';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class OperationalVerticalSubjectService {

    constructor(private http: HttpClient) { }

    getByAcademicSession(academicSessionId: number, programId: number, operationalVerticalId: number) {
        return this.http.get<OperationalVerticalSubject[]>(environment.apiStudentsUrl + '/OperationalVerticalSubject/GetByAcademicSession/' + academicSessionId + '/Program/' + programId + '/OperationalVertical/' + operationalVerticalId)
    }
}