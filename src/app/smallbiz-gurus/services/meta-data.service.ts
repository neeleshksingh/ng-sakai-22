import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class SmallBizzGurusMetaDataService {

  constructor(private http: HttpClient) { }
    getMetaData() {
        return this.http.get<any[]>(environment.apiHumanResourcesUrl + '/MetaData/GetPermissions');
    }
}