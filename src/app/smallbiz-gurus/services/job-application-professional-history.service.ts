import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JobApplicationProfessionalHistory } from 'src/app/shared/models/smallbizgurus/job-application';
import { GenericServiceNols } from 'src/app/shared/services/generic-service-nols.service';
import { environment } from 'src/environments/environment';


@Injectable({
    providedIn: 'root'
})
export class JobApplicationProfessionalHistoryService extends GenericServiceNols<JobApplicationProfessionalHistory, JobApplicationProfessionalHistory> {

    constructor(http: HttpClient) {
        super(http, "JobApplicationProfessionalHistory", environment.apiHumanResourcesUrl);
    }

    getJobApplicationProfessionalHistoryByJobApplicationId(jobApplicationId: number) {
        return this.http.get<JobApplicationProfessionalHistory[]>(environment.apiHumanResourcesUrl + '/JobApplicationProfessionalHistory/GetByJobApplicationId/' + jobApplicationId);
    }
}