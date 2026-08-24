import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StudentFamily } from 'src/app/shared/models/students/student-family';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class StudentFamilyService {
  
    constructor(private http: HttpClient) { }
    GetStudentFamily() {
        return this.http.get<StudentFamily[]>(environment.apiStudentsUrl + '/StudentFamily/GetStudentFamily')     
    }
    
    GetStudentFamilyDetailsByRegistrationId(studentId:string) {
        return this.http.get<StudentFamily[]>(environment.apiStudentsUrl + '/StudentFamily/GetByStudentId/'+studentId)     
    }
}