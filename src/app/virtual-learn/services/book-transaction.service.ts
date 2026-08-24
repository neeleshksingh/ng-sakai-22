import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DateRange } from 'src/app/shared/models/commons/date-range';
import { BookTransaction, IssueReturnBookReport, IssueReturnBookReportResponse } from 'src/app/shared/models/virtuallearn/book-transaction';
import { GenericServiceNols } from 'src/app/shared/services/generic-service-nols.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BookTransactionService extends GenericServiceNols<BookTransaction, BookTransaction> {

  constructor(http: HttpClient) {
    super(http, "BookTransaction", environment.apiVirtualLearnUrl);
  }

  getByBookTransactionSearchRequest(bookPurchaseRequisition: IssueReturnBookReport) {
    return this.http.post<IssueReturnBookReportResponse>(environment.apiVirtualLearnUrl + '/BookTransaction/GetByBookTransactionSearchRequest', bookPurchaseRequisition);
  }

  getByBookTransactionTrasactionType(dateRange: DateRange, transactionType: number) {
    return this.http.post<any>(environment.apiVirtualLearnUrl + '/BookTransaction/GetByTransactionType/' + transactionType, dateRange);
  }
}