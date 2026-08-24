import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DashboardTile } from 'src/app/shared/models/virtuallearn/dashboard';
import { GenericServiceNols } from 'src/app/shared/services/generic-service-nols.service';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class DashboardService extends GenericServiceNols<DashboardTile, DashboardTile> {

    constructor(http: HttpClient) {
        super(http, "DashboardTile", environment.apiVirtualLearnUrl);
    }
}