import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }
  getEmployeeCodeByEmail(email: string) {
    return this.http.get(environment.apiHumanResourcesUrl + '/Employee/GetByEmail/' + email)
  }
}
