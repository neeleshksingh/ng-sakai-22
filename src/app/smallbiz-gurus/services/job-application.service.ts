import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JobApplication, JobDocument, Otp } from 'src/app/shared/models/smallbizgurus/job-application';
import { GenericServiceNols } from 'src/app/shared/services/generic-service-nols.service';
import { environment } from 'src/environments/environment';


@Injectable({
    providedIn: 'root'
})
export class JobApplicationService extends GenericServiceNols<JobApplication, JobApplication> {

    constructor(http: HttpClient) {
        super(http, "JobApplication", environment.apiHumanResourcesUrl);
    }

    getByInterviewScheduleId(interviewScheduleId: number) {
        return this.http.get(environment.apiHumanResourcesUrl + '/JobApplication/GetByInterviewScheduleId/' + interviewScheduleId);
    }

    uploadResume(jobDocument: JobDocument, formData: any) {
        return this.http.post<JobDocument>(environment.apiFilemanagerUrl + '/api/Document/UploadFile/' + jobDocument.documentType, formData);
    }

    updateJobApplicationResumeLinkByJobApplicationId(resumeLink: string, jobApplicationId: number, phoneNumber: string) {
        return this.http.post<any>(environment.apiHumanResourcesUrl + '/JobApplication/UpdateJobApplicationResumeLinkByJobApplicationId/' + jobApplicationId + '/PhoneNumber/' + phoneNumber, `"${resumeLink}"`, {
            headers: { 'Content-Type': 'application/json' }
        });
    }

    getByStaffingPlanId(staffID: number, isApplicantSelected: Boolean, isOfferLetterReleased: Boolean) {
        return this.http.get<any>(environment.apiHumanResourcesUrl + `/JobApplication/GetByStaffingPlanId/${staffID}/IsApplicantSelected/${isApplicantSelected}/IsOfferLetterReleased/${isOfferLetterReleased}`)
    }

    getJobApplicationByPhoneNumberApplicationId(phoneNumber: any, applicationId: any) {
        return this.http.get<JobApplication>(environment.apiHumanResourcesUrl + '/JobApplication/GetJobApplicationByPhoneNumber/' + phoneNumber + '/ApplicationId/' + applicationId);
    }

    sendOTP(otp: Otp) {
        return this.http.post<Otp>(environment.apiHumanResourcesUrl + '/JobApplication/SendOTP', otp);
    }

    finalSubmit(payload: JobApplication, jobApplicationId: number) {
        return this.http.post<JobApplication>(environment.apiHumanResourcesUrl + '/JobApplication/Submit/' + jobApplicationId, payload);
    }
}