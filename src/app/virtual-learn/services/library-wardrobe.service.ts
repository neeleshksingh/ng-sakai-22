import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LibraryWardrobe } from 'src/app/shared/models/virtuallearn/library-wardrobe';
import { GenericServiceNols } from 'src/app/shared/services/generic-service-nols.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LibraryWardrobeService extends GenericServiceNols<LibraryWardrobe, LibraryWardrobe> {

  constructor(http: HttpClient) {
    super(http, "LibraryWardrobe", environment.apiVirtualLearnUrl);
  }
}