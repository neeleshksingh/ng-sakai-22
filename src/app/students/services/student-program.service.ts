import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StudentProgram } from 'src/app/shared/models/mindspark/student-program';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class StudentProgramService {

    constructor(private http: HttpClient) { }

    getStudentProgramList() {
        return this.http.get<StudentProgram[]>(environment.apiStudentsUrl + '/StudentProgram/GetStudentProgram')
    }

    getStudentProgramByStudentId(studentId: string) {
        return this.http.get<StudentProgram[]>(environment.apiStudentsUrl + '/StudentProgram/GetByStudentId/' + studentId)
    }

    getByStudentId(studentId: string) {
        return this.http.get<StudentProgram[]>(environment.apiStudentsUrl + '/StudentProgram/GetByStudentId/' + studentId);
    }
}