import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BookPurchaseOrder, BookPurchaseOrderResponse } from 'src/app/shared/models/virtuallearn/book-purchase-order';
import { GenericServiceNols } from 'src/app/shared/services/generic-service-nols.service';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class BookPurchaseOrderService extends GenericServiceNols<BookPurchaseOrder, BookPurchaseOrderResponse> {

    constructor(http: HttpClient) {
        super(http, "BookPurchaseOrder", environment.apiVirtualLearnUrl);
    }
}