import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class BatchRoomPlannerService {

    constructor(private http: HttpClient) {
    }

    downloadByBuildingIdRoomId(buildingId: number, roomId: number) {
        return this.http.get<any>(environment.apiAcademicsUrl + `/BatchRoomPlanner/DownloadByBuilding/${buildingId}/Room/${roomId}`)
    }
}