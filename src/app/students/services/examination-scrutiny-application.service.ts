import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExaminationScrutinyApplicationService {

  constructor(private http: HttpClient) { }
    getExaminationScrutinyApplicationByStudentIdExamId(studentId : string, examinationId: number){
      return this.http.get<any>(environment.apiStudentsUrl + '/ExaminationScrutinyApplication/GetByStudentId/' + studentId + '/Examination/' + examinationId)
    }

    ExaminationScrutinyApplicationAdd(examinationScrutinyApplication: any) {
      return this.http.post<any>(environment.apiStudentsUrl + '/ExaminationScrutinyApplication/Add', examinationScrutinyApplication)
    }
}
