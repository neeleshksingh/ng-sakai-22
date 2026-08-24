import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Student } from 'src/app/shared/models/bigleads/student';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class StudentService {

    constructor(private http: HttpClient) { }

    getByStudentId(studentId:string) {
        return this.http.get<Student>(environment.apiAcademicsUrl + '/Student/GetByStudentId/' + studentId);
    }
}