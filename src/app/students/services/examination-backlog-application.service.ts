import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


@Injectable({
    providedIn: 'root'
})
export class ExaminationBacklogApplicationService {
    constructor(private http: HttpClient) { }

    getBacklogExaminationApplicationDataByRegistrationNumberExmainationId(registrationNumber : String, examinationId : number){
        return this.http.get<any>(environment.apiStudentsUrl + '/ExaminationBacklogApplication/GetBacklogExaminationApplicationDataByRegistrationNumber/' + registrationNumber + '/Examination/' + examinationId)
    }

    addBacklogExaminationApplication(payload : any){
        return this.http.post<any>(environment.apiStudentsUrl + '/ExaminationBacklogApplication/Add', payload)
    }
}