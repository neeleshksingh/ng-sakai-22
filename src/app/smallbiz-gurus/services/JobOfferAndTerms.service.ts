import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JobOfferAndTerms } from 'src/app/shared/models/smallbizgurus/job-offer-and-terms';
import { GenericServiceNols } from 'src/app/shared/services/generic-service-nols.service';
import { environment } from 'src/environments/environment';


@Injectable({
    providedIn: 'root'
})
export class JobOfferAndTermsService extends GenericServiceNols<JobOfferAndTerms, JobOfferAndTerms> {

    constructor(http: HttpClient) {
        super(http, "JobOfferAndTerms", environment.apiHumanResourcesUrl);
    }
}