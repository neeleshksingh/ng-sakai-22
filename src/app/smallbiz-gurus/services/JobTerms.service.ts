import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JobTerm } from 'src/app/shared/models/smallbizgurus/job-term';
import { GenericServiceNols } from 'src/app/shared/services/generic-service-nols.service';
import { environment } from 'src/environments/environment';



@Injectable({
    providedIn: 'root'
})
export class JobTermService extends GenericServiceNols<JobTerm, JobTerm> {

    constructor(http: HttpClient) {
        super(http, "JobTerm", environment.apiHumanResourcesUrl);
    }
}