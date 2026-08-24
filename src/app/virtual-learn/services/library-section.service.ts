import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LibrarySection } from 'src/app/shared/models/virtuallearn/library-section';
import { GenericServiceNols } from 'src/app/shared/services/generic-service-nols.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LibrarySectionService extends GenericServiceNols<LibrarySection, LibrarySection> {

  constructor(http: HttpClient) {
    super(http, "LibrarySection", environment.apiVirtualLearnUrl);
  }
}