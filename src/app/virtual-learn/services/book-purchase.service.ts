import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BookPurchase } from 'src/app/shared/models/virtuallearn/book-purchase';
import { GenericServiceNols } from 'src/app/shared/services/generic-service-nols.service';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class BookPurchaseService extends GenericServiceNols<BookPurchase, BookPurchase> {

    constructor(http: HttpClient) {
        super(http, "BookPurchase", environment.apiVirtualLearnUrl);
    }
}