import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeJoiningDetailService {

  constructor(private http: HttpClient) { }
  getEmployeeJoiningDetails() {
    return this.http.get<any>(environment.apiTimeClockPlusUrl + '/EmployeeJoiningDetail/GetActiveEmployeeJoiningDetail');
  }

  getEmployeeJoiningDetailsByEmployeeCode(empCode: string) {
    return this.http.get<any[]>(environment.apiHumanResourcesUrl + '/EmployeeJoiningDetail/GetByEmployeeCode/' + empCode)
  }
}
