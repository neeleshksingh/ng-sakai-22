import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { OrganisationFeedbackInternal, OrganisationFeedbackPivotReport } from 'src/app/shared/models/executiveedge/organisation-feedback-internal';
import { GenericService } from 'src/app/shared/services/generic.service';
import { environment } from 'src/environments/environment';


@Injectable({
    providedIn: 'root'
})
export class OrganisationFeedbackInternalService extends GenericService<OrganisationFeedbackInternal, OrganisationFeedbackInternal> {
    constructor(http: HttpClient, messageService: MessageService) {
        super(http, messageService, "OrganisationFeedbackInternal", environment.apiExecutiveEdgeUrl);
    }

    getBatchFacultyFeedbackPivotByFeedbackAnnouncement(feedbackAnnouncementId: number) {
        return this.http.get<OrganisationFeedbackPivotReport>(environment.apiExecutiveEdgeUrl + '/OrganisationFeedbackInternal/GetPivotByFeedbackAnnouncement/' + feedbackAnnouncementId);
    }
    getBatchFacultyFeedbackAnalyticsByFeedbackAnnouncement(feedbackAnnouncementId: number) {
        return this.http.get<any[]>(environment.apiExecutiveEdgeUrl + '/OrganisationFeedbackInternal/GetAnalyticsByFeedbackAnnouncement/' + feedbackAnnouncementId);
    }
}