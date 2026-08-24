import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageFromDesk } from 'src/app/shared/models/message-from-desk/message-from-desk';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MessageFromDeskService {

    constructor(private http: HttpClient) { }

    getAll() {
      return this.http.get<MessageFromDesk[]>('assets/Partner_Documents/' + environment.partner.partnerCode + '/university-leadership.json');
    }
}