import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { FeedbackAnnouncement } from 'src/app/shared/models/executiveedge/feedback-announcement';
import { GenericService } from 'src/app/shared/services/generic.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class FeedbackAnnouncementService extends GenericService<FeedbackAnnouncement, FeedbackAnnouncement> {
  constructor(http: HttpClient, messageService: MessageService) {
    super(http, messageService, "FeedbackAnnouncement", environment.apiExecutiveEdgeUrl);
  }

  getActiveFeedbackAnnouncement() {
    return this.http.get<FeedbackAnnouncement[]>(environment.apiExecutiveEdgeUrl + '/FeedbackAnnouncement/GetActiveFeedbackAnnouncement');
  }
}