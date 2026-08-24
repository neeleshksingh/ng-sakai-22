import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LibraryLibraryRoomMapping } from 'src/app/shared/models/virtuallearn/library-library-room-mapping';
import { GenericServiceNols } from 'src/app/shared/services/generic-service-nols.service';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class LibraryLibraryRoomMappingService extends GenericServiceNols<LibraryLibraryRoomMapping, LibraryLibraryRoomMapping> {

  constructor(http: HttpClient) {
    super(http, "LibraryLibraryRoomMapping", environment.apiVirtualLearnUrl);
  }

  getByLibraryId(libraryId: number) {
    return this.http.get<LibraryLibraryRoomMapping[]>(this.apiBaseUrl + '/' + this.genericObjectName + '/GetByLibraryId/' + libraryId);
  }
}