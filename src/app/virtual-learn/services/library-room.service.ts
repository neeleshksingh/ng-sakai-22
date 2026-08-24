import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LibraryRoom } from 'src/app/shared/models/virtuallearn/library-room';
import { GenericServiceNols } from 'src/app/shared/services/generic-service-nols.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LibraryRoomService extends GenericServiceNols<LibraryRoom, LibraryRoom> {

  constructor(http: HttpClient) {
    super(http, "LibraryRoom", environment.apiVirtualLearnUrl);
  }
}