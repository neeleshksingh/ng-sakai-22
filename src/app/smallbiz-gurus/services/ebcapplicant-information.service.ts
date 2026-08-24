
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EBCApplicantInformation } from 'src/app/shared/models/smallbizgurus/ebc-applicant-information';
import { GenericServiceNols } from 'src/app/shared/services/generic-service-nols.service';
import { environment } from 'src/environments/environment';


@Injectable({
    providedIn: 'root'
})

export class EBCApplicantInformationService extends GenericServiceNols<EBCApplicantInformation, EBCApplicantInformation> {
    constructor(http: HttpClient) {
        super(http, "EBCApplicantInformation", environment.apiHumanResourcesUrl);
    }

    getEBCApplicantInformationByJobApplicationId(JobApplicationId: number) {
        return this.http.get<EBCApplicantInformation>(environment.apiHumanResourcesUrl + '/EBCApplicantInformation/GetByJobApplicationId/' + JobApplicationId);
    }
}