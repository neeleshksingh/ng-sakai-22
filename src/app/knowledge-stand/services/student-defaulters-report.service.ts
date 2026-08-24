import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StudentDefaulterReportService {

  constructor(private http:HttpClient) { }
  GetStudentExaminationResultStatusByAcademicSession(academicSessionID:string, programID:string, operationalVerticalID:string){
    return this.http.get(environment.apiExaminationsUrl + '/ExaminationResult/GetStudentExaminationResultStatusByAcademicSession/'+ academicSessionID +'/Program/'+ programID +'/OperationalVertical/'+ operationalVerticalID)

  }
}
