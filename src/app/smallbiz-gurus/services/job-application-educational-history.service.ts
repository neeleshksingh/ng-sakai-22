import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JobApplicationEducationalHistory } from 'src/app/shared/models/smallbizgurus/job-application';
import { GenericServiceNols } from 'src/app/shared/services/generic-service-nols.service';
import { environment } from 'src/environments/environment';


@Injectable({
    providedIn: 'root'
})
export class JobApplicationEducationalHistoryService extends GenericServiceNols<JobApplicationEducationalHistory, JobApplicationEducationalHistory> {

    constructor(http: HttpClient) {
        super(http, "JobApplicationEducationalHistory", environment.apiHumanResourcesUrl);
    }

    getJobApplicationEducationalHistoryByJobApplicationId(jobApplicationId: number) {
        return this.http.get<JobApplicationEducationalHistory[]>(environment.apiHumanResourcesUrl + '/JobApplicationEducationalHistory/GetByJobApplicationId/' + jobApplicationId);
    }
}