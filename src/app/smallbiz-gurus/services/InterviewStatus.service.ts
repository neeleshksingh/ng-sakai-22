import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InterviewStatus } from 'src/app/shared/models/smallbizgurus/interview-status';
import { GenericServiceNols } from 'src/app/shared/services/generic-service-nols.service';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class InterviewStatusService extends GenericServiceNols<InterviewStatus, InterviewStatus> {
    constructor(http: HttpClient) {
        super(http, "InterviewStatus", environment.apiHumanResourcesUrl);
    }
    getByJobApplicationId(jobApplicationId: number) {
        return this.http.get<any>(environment.apiHumanResourcesUrl + '/InterviewStatus/GetByJobApplicationId/' + jobApplicationId);
    }
}