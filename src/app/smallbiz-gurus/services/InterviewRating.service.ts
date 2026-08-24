import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Interviews } from 'src/app/shared/models/smallbizgurus/interviews';
import { GenericServiceNols } from 'src/app/shared/services/generic-service-nols.service';
import { environment } from 'src/environments/environment';



@Injectable({
    providedIn: 'root'
})
export class InterviewRatingService extends GenericServiceNols<Interviews, Interviews> {

    constructor(http: HttpClient) {
        super(http, "InterviewRating", environment.apiHumanResourcesUrl);
    }
}