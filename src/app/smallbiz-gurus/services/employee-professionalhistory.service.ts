import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EBCApplicantProfessionalHistory } from 'src/app/shared/models/smallbizgurus/ebc-applicant-professionalhistory';
import { GenericServiceNols } from 'src/app/shared/services/generic-service-nols.service';
import { environment } from 'src/environments/environment';
@Injectable({
    providedIn: 'root'
})
export class EBCApplicantProfessionalHistoryService extends GenericServiceNols<EBCApplicantProfessionalHistory, EBCApplicantProfessionalHistory> {
    constructor(http: HttpClient) {
        super(http, "EBCApplicantProfessionalHistory", environment.apiHumanResourcesUrl);
    }
}