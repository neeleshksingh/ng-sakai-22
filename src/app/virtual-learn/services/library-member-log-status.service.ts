import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LibraryMemberLogStatus } from 'src/app/shared/models/virtuallearn/library-member-log-status';
import { GenericServiceNols } from 'src/app/shared/services/generic-service-nols.service';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class LibraryMemberLogStatusService extends GenericServiceNols<LibraryMemberLogStatus, LibraryMemberLogStatus> {

    constructor(http: HttpClient) {
        super(http, "LibraryMemberLogStatus", environment.apiVirtualLearnUrl);
    }
}