import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EmployeeJoiningDetails } from 'src/app/shared/models/smallbizgurus/employee-joining-details';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeJoiningDetailService {

  constructor(private http: HttpClient) { }

  getEmployeeJoiningDetailAllowedClassAndLab(){
    return this.http.get<EmployeeJoiningDetails[]>(environment.apiGlobalUrl +'/EmployeeJoiningDetail/GetEmployeeJoiningDetailAllowedClassAndLab');
  }

  getActiveEmployeeJoiningDetail() {
    return this.http.get<EmployeeJoiningDetails[]>(environment.apiHumanResourcesUrl + '/EmployeeJoiningDetail/GetActiveEmployeeJoiningDetail');
  }
}