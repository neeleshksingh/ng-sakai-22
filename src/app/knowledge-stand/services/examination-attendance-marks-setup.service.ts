import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


@Injectable({
    providedIn: 'root'
})
export class ExaminationAttendanceMarksSetupService {

    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<any[]>(environment.apiExaminationsUrl + '/ExaminationAttendanceMarksSetup/GetAll');
    }

    add(examinationAttendanceMarksSetup: any[]) {
        return this.http.post<any>(environment.apiExaminationsUrl + '/ExaminationAttendanceMarksSetup/Add', examinationAttendanceMarksSetup);
    }

    deleteByID(examinationAttendanceMarksSetup: any) {
        return this.http.post<any[]>(environment.apiExaminationsUrl + `/ExaminationAttendanceMarksSetup/DeleteByIntId/${examinationAttendanceMarksSetup}` , {});
    }
    getByExaminationID(examinationID: number) {
        return this.http.get<any>(environment.apiExaminationsUrl + '/ExaminationAttendanceMarksSetup/GetByExaminationId/' + examinationID);
    }
   

    addMultiple(examinationAttendanceMarksSetup:any[]){
    return this.http.post<any[]>(environment.apiExaminationsUrl + '/ExaminationAttendanceMarksSetup/AddMultiple', examinationAttendanceMarksSetup);

    }
}