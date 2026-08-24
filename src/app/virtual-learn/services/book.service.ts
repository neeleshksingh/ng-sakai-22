import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Book } from 'src/app/shared/models/virtuallearn/book';
import { BookDetail } from 'src/app/shared/models/virtuallearn/book-detail';
import { GenericServiceNols } from 'src/app/shared/services/generic-service-nols.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BookService extends GenericServiceNols<Book, Book> {

  constructor(http: HttpClient) {
    super(http, "Book", environment.apiVirtualLearnUrl);
  }

  getByAccessionNumber(accessionNumber: string) {
    return this.http.get<BookDetail>(environment.apiVirtualLearnUrl + `/Book/GetByAccessionNumber/${accessionNumber}`)
  }

  getByInvoiceNumber(invoiceNumber: string) {
    return this.http.get<any[]>(environment.apiVirtualLearnUrl + `/Book/GetByInvoiceNumber/${invoiceNumber}`)
  }
  getByBookCategoryId(bookCategoryId: number) {
    return this.http.get<Book[]>(environment.apiVirtualLearnUrl + `/Book/GetByBookCategoryId/${bookCategoryId}`)
  }

  uploadBooks(file: any) {
    return this.http.post(environment.apiVirtualLearnUrl + '/Book/UploadBooks', file);
  }
}