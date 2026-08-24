import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InterviewEvaluation } from 'src/app/shared/models/smallbizgurus/interview-evaluation';
import { GenericServiceNols } from 'src/app/shared/services/generic-service-nols.service';
import { environment } from 'src/environments/environment';


@Injectable({
    providedIn: 'root'
})
export class InterviewEvaluationService extends GenericServiceNols<InterviewEvaluation, InterviewEvaluation> {

    constructor(http: HttpClient) {
        super(http, "InterviewEvaluation", environment.apiHumanResourcesUrl);
    }
}