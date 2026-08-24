import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BookLocation } from 'src/app/shared/models/virtuallearn/book-location';
import { GenericServiceNols } from 'src/app/shared/services/generic-service-nols.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BookLocationService extends GenericServiceNols<BookLocation, BookLocation> {

  constructor(http: HttpClient) {
    super(http, "BookLocation", environment.apiVirtualLearnUrl);
  }

  getByBookId(bookId: number) {
    return this.http.get<BookLocation>(environment.apiVirtualLearnUrl + '/BookLocation/GetByBookId/' + bookId);
  }
}