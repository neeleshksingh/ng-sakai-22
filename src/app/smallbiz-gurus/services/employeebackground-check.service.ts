
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EBCApplicantAddress } from 'src/app/shared/models/smallbizgurus/ebc-applicantaddress';
import { GenericServiceNols } from 'src/app/shared/services/generic-service-nols.service';
import { environment } from 'src/environments/environment';


@Injectable({
    providedIn: 'root'
})

export class EBCApplicantAddressService extends GenericServiceNols<EBCApplicantAddress, EBCApplicantAddress> {

    constructor(http: HttpClient) {
        super(http, "EBCApplicantAddress", environment.apiHumanResourcesUrl);
    }
    getEBCApplicantAddressByJobApplicationId(JobApplicationId: number) {
        return this.http.get<EBCApplicantAddress>(environment.apiHumanResourcesUrl + '/EBCApplicantAddress/GetByJobApplicationId/' + JobApplicationId);
    }
}