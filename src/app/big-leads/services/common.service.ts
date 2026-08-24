import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Caste } from 'src/app/shared/models/cloudbytes/caste';
import { CasteCategory } from 'src/app/shared/models/cloudbytes/caste-category';
import { Religion } from 'src/app/shared/models/cloudbytes/religion';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CommonService   {

  constructor(private http: HttpClient) { }

  getAllCaste() {
    return this.http.get<Caste[]>(environment.apiGlobalUrl + '/Caste/GetAll');
  }

  getAllCasteCategory() {
    return this.http.get<CasteCategory[]>(environment.apiGlobalUrl + '/CasteCategory/GetAll');
  }

  getAllReligion() {
    return this.http.get<Religion[]>(environment.apiGlobalUrl + '/Religion/GetAll');
  }
}
