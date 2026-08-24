import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StudentAddress } from 'src/app/shared/models/students/student-address';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class StudentAddressService {
  
    constructor(private http: HttpClient) { }
    GetStudentAddress() {
        return this.http.get<StudentAddress[]>(environment.apiStudentsUrl + '/StudentAddress/GetStudentAddress')      
    }

    GetStudentAddressByRegistrationId(studentId:string) {
        return this.http.get<StudentAddress[]>(environment.apiStudentsUrl + '/StudentAddress/GetByStudentId/'+studentId)     
    }
}