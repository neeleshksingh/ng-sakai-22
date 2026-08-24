import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Room } from 'src/app/shared/models/cloudbytes/room';
import { GenericService } from 'src/app/shared/services/generic.service';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class RoomService extends GenericService<Room, Room> {

    constructor(http: HttpClient, messageService: MessageService) {
        super(http, messageService, "Room", environment.apiMastersUrl);
    }
}