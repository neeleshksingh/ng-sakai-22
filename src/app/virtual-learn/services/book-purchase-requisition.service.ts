import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BookPurchaseRequisition } from 'src/app/shared/models/virtuallearn/book-purchase-requisition';
import { GenericServiceNols } from 'src/app/shared/services/generic-service-nols.service';
import { environment } from 'src/environments/environment';
@Injectable({
    providedIn: 'root'
})
export class BookPurchaseRequisitionService extends GenericServiceNols<BookPurchaseRequisition, BookPurchaseRequisition> {

    constructor(http: HttpClient) {
        super(http, "BookPurchaseRequisition", environment.apiVirtualLearnUrl);
    }

    getBookPurchaseRequisitionUnprocessed() {
        return this.http.get<any>(environment.apiVirtualLearnUrl + '/BookPurchaseRequisition/GetBookPurchaseRequisitionUnprocessed');
    }

    getBookPurchaseRequisitionDetailByBookPurchaseRequisitionIds(ids: any[]) {
        return this.http.post<any>(environment.apiVirtualLearnUrl + '/BookPurchaseRequisition/GetBookPurchaseRequisitionDetailByBookPurchaseRequisitionIds', ids);
    }
}