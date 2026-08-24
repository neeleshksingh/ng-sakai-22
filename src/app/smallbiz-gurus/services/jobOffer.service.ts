import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DateRange, JobOffer } from 'src/app/shared/models/smallbizgurus/job-offer';
import { GenericServiceNols } from 'src/app/shared/services/generic-service-nols.service';
import { environment } from 'src/environments/environment';



@Injectable({
    providedIn: 'root'
})
export class JobOfferService extends GenericServiceNols<JobOffer, JobOffer> {

    constructor(http: HttpClient) {
        super(http, "JobOffer", environment.apiHumanResourcesUrl);
    }

    GetByDateRangeRequest(JobOffer: DateRange) {
        return this.http.post(environment.apiHumanResourcesUrl + '/JobOffer/GetByDateRangeRequest', JobOffer);
    }
}