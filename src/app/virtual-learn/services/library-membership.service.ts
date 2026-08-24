import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LibraryMembership } from 'src/app/shared/models/virtuallearn/library-membership';
import { GenericServiceNols } from 'src/app/shared/services/generic-service-nols.service';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class LibraryMembershipService extends GenericServiceNols<LibraryMembership, LibraryMembership> {

    constructor(http: HttpClient) {
        super(http, "LibraryMembership", environment.apiVirtualLearnUrl);
    }
    getByCode(libraryMembershipCode: string) {
        return this.http.get<LibraryMembership>(environment.apiVirtualLearnUrl + `/LibraryMembership/GetByCode/${libraryMembershipCode}`);
    }
}