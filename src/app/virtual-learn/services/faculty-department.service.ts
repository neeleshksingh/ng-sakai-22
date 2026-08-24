import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Library } from 'src/app/shared/models/virtuallearn/library';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FacultyDepartmentService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<Library[]>(environment.apiVirtualLearnUrl + '/FacultyDepartment/GetAll')
  }
}