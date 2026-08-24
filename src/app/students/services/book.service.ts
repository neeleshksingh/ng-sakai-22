import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BookSearchResponse } from 'src/app/shared/models/virtuallearn/book-search-response';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient) { }

  GetByTerms(terms: string) {
    return this.http.get<BookSearchResponse>(environment.apiStudentsUrl + '/Book/GetBySearchText/' + terms);
  }

  GetBySearchCriteria(searchCriteria: any) {
    return this.http.post<BookSearchResponse>(environment.apiStudentsUrl + '/Book/GetBySearchCriteria', searchCriteria);
  }
}
