import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from 'src/app/shared/models/smallbizgurus/employee';
import { EmployeeJoiningDetails } from 'src/app/shared/models/smallbizgurus/employee-joining-details';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }

  getEmployeeList() {
      return this.http.get<Employee[]>(environment.apiGlobalUrl + '/Employee/GetAll');
  }
  getEmployeeById(employeeId: number) {
      return this.http.get<Employee>(environment.apiGlobalUrl  + '/Employee/GetByIntId/' + employeeId);
  }
  getEmployeeByTerm(employeeTerm: string) {
      return this.http.get<Employee[]>(environment.apiGlobalUrl  + '/Employee/GetByTerms/' + employeeTerm);
  }
  getByEmployeeCode(employeeCode: string) {
      return this.http.get<Employee[]>(environment.apiGlobalUrl  + '/Employee/GetByEmployeeCode/' + employeeCode);
  }
  getEmployeeJoiningDetailAllowedClassAndLab()
  {
    return this.http.get<EmployeeJoiningDetails[]>(environment.apiGlobalUrl +'/EmployeeJoiningDetail/GetEmployeeJoiningDetailAllowedClassAndLab');
  }
}