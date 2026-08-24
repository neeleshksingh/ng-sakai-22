import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InterviewSchedule } from 'src/app/shared/models/smallbizgurus/interview-schedule';
import { GenericServiceNols } from 'src/app/shared/services/generic-service-nols.service';
import { environment } from 'src/environments/environment';


@Injectable({
    providedIn: 'root'
})
export class InterviewScheduleService extends GenericServiceNols<InterviewSchedule, InterviewSchedule> {

    constructor(http: HttpClient) {
        super(http, "InterviewSchedule", environment.apiHumanResourcesUrl);
    }
    getByPendingEvaluation() {
        return this.http.get<any>(environment.apiHumanResourcesUrl + '/InterviewSchedule/GetByPendingEvaluation');
    }
}