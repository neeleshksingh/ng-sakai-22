import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JobOpening } from 'src/app/shared/models/smallbizgurus/job-opening';
import { GenericServiceNols } from 'src/app/shared/services/generic-service-nols.service';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class JobOpeningService extends GenericServiceNols<JobOpening, JobOpening> {

  constructor(http: HttpClient) {
    super(http, "JobOpening", environment.apiHumanResourcesUrl);
  }
  currentOpenings() {
    return this.http.get<JobOpening[]>(environment.apiHumanResourcesUrl + '/JobOpening/GetCurrentJobOpening');
  }
  currentJobOpeningById(id: number) {
    return this.http.get<JobOpening>(environment.apiHumanResourcesUrl + '/JobOpening/GetCurrentJobOpeningById/' + id);
  }
}