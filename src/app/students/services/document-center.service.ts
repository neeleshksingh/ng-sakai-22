import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DocumentCenter } from 'src/app/shared/models/students/document-center';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DocumentCenterService {

  constructor(private http: HttpClient) { }
  getAll() {
    return this.http.get<DocumentCenter[]>(environment.apiStudentsUrl + '/DocumentCenter/GetAll');
  }
}
