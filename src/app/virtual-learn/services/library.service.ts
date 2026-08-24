import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Library } from 'src/app/shared/models/virtuallearn/library';
import { GenericServiceNols } from 'src/app/shared/services/generic-service-nols.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LibraryService extends GenericServiceNols<Library, Library> {

  constructor(http: HttpClient) {
    super(http, "Library", environment.apiVirtualLearnUrl);
  }
}