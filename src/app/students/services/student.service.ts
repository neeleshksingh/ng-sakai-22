import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Student, StudentOTPValidate } from 'src/app/shared/models/students/student';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class StudentService {
  
    constructor(private http: HttpClient) { }
    GetStudentProfile() {
        return this.http.get<Student>(environment.apiStudentsUrl + '/Student/GetStudentProfile')
            
    }
    UpdateStudentProfile(studentOTPValidate: StudentOTPValidate) {
        return this.http.post<any>(environment.apiStudentsUrl + '/Student/UpdateStudentProfile', studentOTPValidate);
            
    }

    VerifyApaar(abcId: string, studentId: string) {
        const encodedAbcId = encodeURIComponent(abcId);
        const encodedStudentId = encodeURIComponent(studentId);
        return this.http.get<any>(environment.apiStudentsUrl + `/Student/VerifyApaar/${encodedAbcId}/studentId/${encodedStudentId}`);
    }
}