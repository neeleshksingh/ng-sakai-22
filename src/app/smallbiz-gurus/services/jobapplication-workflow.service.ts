import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JobApplicationWorkflow } from 'src/app/shared/models/smallbizgurus/job-application-workflow';
import { GenericServiceNols } from 'src/app/shared/services/generic-service-nols.service';
import { environment } from 'src/environments/environment';


@Injectable({
    providedIn: 'root'
})

export class JobApplicationWorkflowService extends GenericServiceNols<JobApplicationWorkflow, JobApplicationWorkflow> {

    constructor(http: HttpClient) {
        super(http, "JobApplicationWorkflow", environment.apiHumanResourcesUrl);
    }

    getJobApplicationWorkflowByJobApplicationId(jobApplicationId: number) {
        return this.http.get<JobApplicationWorkflow>(environment.apiHumanResourcesUrl + '/JobApplicationWorkflow/GetByJobApplicationId/' + jobApplicationId);
    }
}