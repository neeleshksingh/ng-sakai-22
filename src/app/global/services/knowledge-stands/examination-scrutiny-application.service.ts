import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ExaminationScrutinyApplicationService {

  constructor(private http: HttpClient) { }

  getApplicationListByExamId(id : number) {
    return this.http.get<any>(environment.apiGlobalUrl + '/ExaminationScrutinyApplication/GetByExaminationId/' + id);    
    }
}
