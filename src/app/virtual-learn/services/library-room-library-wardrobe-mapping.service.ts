import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LibraryRoomLibraryWardrobeMapping, LibraryRoomLibraryWardrobeMappingResponse } from 'src/app/shared/models/virtuallearn/library-room-library-wardrobe-mapping';
import { GenericServiceNols } from 'src/app/shared/services/generic-service-nols.service';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class LibraryRoomLibraryWardrobeMappingService extends GenericServiceNols<LibraryRoomLibraryWardrobeMapping, LibraryRoomLibraryWardrobeMappingResponse> {

  constructor(http: HttpClient) {
    super(http, "LibraryRoomLibraryWardrobeMapping", environment.apiVirtualLearnUrl);
  }

  getLibraryRoomLibraryWardrobeByLibraryRoomId(libraryRoomId: number) {
    return this.http.get<LibraryRoomLibraryWardrobeMappingResponse[]>(environment.apiVirtualLearnUrl + `/LibraryRoomLibraryWardrobeMapping/GetByLibraryRoomId/${libraryRoomId}`)
  }
}