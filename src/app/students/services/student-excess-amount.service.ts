import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StudentExcessAmount } from 'src/app/shared/models/students/student-excess-amount';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class StudentExcessAmountService {

    constructor(private http: HttpClient) { }

    getByRegistrationNumber(registrationNumber:string) {
        return this.http.get<StudentExcessAmount>(environment.apiStudentsUrl + '/StudentExcessAmount/GetByRegistrationNumber/'+registrationNumber)
    }
}