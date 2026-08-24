import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DateRange } from 'src/app/shared/models/commons/date-range';
import { GenericServiceNols } from 'src/app/shared/services/generic-service-nols.service';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class LibraryNotice extends GenericServiceNols<DateRange, DateRange> {

    constructor(http: HttpClient) {
        super(http, "LibraryNotice", environment.apiVirtualLearnUrl);
    }
}