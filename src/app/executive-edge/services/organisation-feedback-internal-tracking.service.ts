import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { FeedbackQuestion } from 'src/app/shared/models/executiveedge/feedbackQuestion';
import { OrganisationFeedbackInternalTracking, OrganisationFeedbackInternalTrackingResponse } from 'src/app/shared/models/executiveedge/organisation-feedback-internal-tracking';
import { GenericService } from 'src/app/shared/services/generic.service';
import { environment } from 'src/environments/environment';


@Injectable({
    providedIn: 'root'
})
export class OrganisationFeedbackInternalTrackingService extends GenericService<OrganisationFeedbackInternalTracking, OrganisationFeedbackInternalTrackingResponse> {
    constructor(http: HttpClient, messageService: MessageService) {
        super(http, messageService, "OrganisationFeedbackInternalTracking", environment.apiExecutiveEdgeUrl);
    }

    organisationFeedbackInternalTrackingByFeedbackAnnouncementIdFacultyCode(announcementId: number, facultyCode: string) {
        return this.http.get<OrganisationFeedbackInternalTrackingResponse[]>(environment.apiExecutiveEdgeUrl + '/OrganisationFeedbackInternalTracking/GetByFeedbackAnnouncementId/' + announcementId + '/FacultyCode/' + facultyCode);
    }
}