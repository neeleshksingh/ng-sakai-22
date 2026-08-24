import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EBCApplicantEducationHistory } from 'src/app/shared/models/smallbizgurus/ebc-applicant-educationhistory';
import { GenericServiceNols } from 'src/app/shared/services/generic-service-nols.service';
import { environment } from 'src/environments/environment';


@Injectable({
    providedIn: 'root'
})
export class EBCApplicantEducationHistoryService extends GenericServiceNols<EBCApplicantEducationHistory, EBCApplicantEducationHistory> {

    constructor(http: HttpClient) {
        super(http, "EBCApplicantEducationHistory", environment.apiHumanResourcesUrl);
    }
    getEBCApplicantEducationalHistoryByJobApplicationId(JobApplicationId: number) {
        return this.http.get<EBCApplicantEducationHistory>(environment.apiHumanResourcesUrl + '/EBCApplicantEducationHistory/GetByJobApplicationId/' + JobApplicationId);
    }
}