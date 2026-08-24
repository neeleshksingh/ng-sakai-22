import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LibraryWardrobeRackNumberMapping } from 'src/app/shared/models/virtuallearn/library-wardrobe-rack-number-mapping';
import { GenericServiceNols } from 'src/app/shared/services/generic-service-nols.service';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class LibraryWardrobeRackNumberMappingService extends GenericServiceNols<LibraryWardrobeRackNumberMapping, LibraryWardrobeRackNumberMapping> {

  constructor(http: HttpClient) {
    super(http, "LibraryWardrobeRackNumberMapping", environment.apiVirtualLearnUrl);
  }
  getLibraryRoomLibraryWardrobeByLibraryWardrobeId(libraryWardrobeId: number) {
    return this.http.get<LibraryWardrobeRackNumberMapping[]>(environment.apiVirtualLearnUrl + `/LibraryWardrobeRackNumberMapping/GetByLibraryWardrobeId/${libraryWardrobeId}`)
  }
}