import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenuModule } from 'primeng/menu';
import { SharedModule } from '../shared.module';
import { AcademicResultComponent } from './components/academic-result/academic-result.component';
import { AdmitCardComponent } from './components/admit-card/admit-card.component';
import { BacklogExaminationApplicationComponent } from './components/backlog-examination-application/backlog-examination-application.component';
import { BacklogExaminationRegistrationComponent } from './components/backlog-examination-registration/backlog-examination-registration.component';
import { BatchAttendanceSummaryComponent } from './components/batch-attendance-summary/batch-attendance-summary.component';
import { ChallanComponent } from './components/challan/challan.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { CgpaConversionCertificateComponent } from './components/cgpa-conversion-certificate/cgpa-conversion-certificate.component';
import { ExaminationRegistrationComponent } from './components/examination-registration/examination-registration.component';
import { ExaminationScrutinyApplicationComponent } from './components/examination-scrutiny-application/examination-scrutiny-application.component';
import { PaymentHelpComponent } from './components/payment-help/payment-help.component';
import { PaymentComponent } from './components/payment/payment.component';
import { RecieptComponent } from './components/reciept/reciept.component';
import { SearchBookComponent } from './components/search-book/search-book.component';
import { SemesterRegistrationComponent } from './components/semester-registration/semester-registration.component';
import { StudentProfileUpdateComponent } from './components/student-profile-update/student-profile-update.component';
import { StudentProfileComponent } from './components/student-profile/student-profile.component';
import { TimeTableComponent } from './components/time-table/time-table.component';
import { StudentsRoutingModule } from './students-routing.module';
import { StudentsComponent } from './students/students.component';

import { BonafiedEKaliyanScholarshipComponent } from './components/bonafied-ekaliyan-scholarship/bonafied-ekaliyan-scholarship.component';
import { BonafiedFeesComponent } from './components/bonafied-fees/bonafied-fees.component';
import { BonafiedJobComponent } from './components/bonafied-job/bonafied-job.component';
import { DocumentCenterComponent } from './components/document-center/document-center.component';
import { ELearningComponent } from './components/e-learning/e-learning.component';
import { NoDuesCertificateComponent } from './components/no-dues-certificate/no-dues-certificate.component';
import { PaymentResponseComponent } from './components/payment-response/payment-response.component';
import { RequestTrackerComponent } from './components/request-tracker/request-tracker.component';
import { ServiceRequestListComponent } from './components/service-request-list/service-request-list.component';
import { ServiceRequestViewComponent } from './components/service-request-view/service-request-view.component';
import { ServiceRequestComponent } from './components/service-request/service-request.component';
import { StudentFeedbackComponent } from './components/student-feedback/student-feedback.component';
import { StudentInfoUpdateRequestComponent } from './components/student-info-update-request/student-info-update-request.component';
import { VerifyApaarComponent } from './components/verify-apaar/verify-apaar.component';
import { CurriculumFrameworkComponent } from './curriculum-framework/curriculum-framework.component';

@NgModule({
    imports: [
        SharedModule,
        CommonModule,
        MenuModule,
        RouterModule,
        StudentsRoutingModule,
        StudentsComponent,
        ExaminationRegistrationComponent,
        BacklogExaminationApplicationComponent,
        BacklogExaminationRegistrationComponent,
        AcademicResultComponent,
        AdmitCardComponent,
        ExaminationScrutinyApplicationComponent,
        SearchBookComponent,
        RequestTrackerComponent,
        PaymentComponent,
        PaymentHelpComponent,
        ChallanComponent,
        RecieptComponent,
        SemesterRegistrationComponent,
        BatchAttendanceSummaryComponent,
        TimeTableComponent,
        StudentInfoUpdateRequestComponent,
        StudentProfileComponent,
        StudentProfileUpdateComponent,
        ChangePasswordComponent,
        CgpaConversionCertificateComponent,
        ServiceRequestListComponent,
        ServiceRequestViewComponent,
        ServiceRequestComponent,
        StudentFeedbackComponent,
        VerifyApaarComponent,
        ELearningComponent,
        DocumentCenterComponent,
        BonafiedJobComponent,
        BonafiedFeesComponent,
        BonafiedEKaliyanScholarshipComponent,
        CurriculumFrameworkComponent,
        NoDuesCertificateComponent,
        PaymentResponseComponent,
    ],
    declarations: [],
    exports: [
        StudentsComponent,
        ExaminationRegistrationComponent,
        BacklogExaminationApplicationComponent,
        BacklogExaminationRegistrationComponent,
        AcademicResultComponent,
        AdmitCardComponent,
        ExaminationScrutinyApplicationComponent,
        SearchBookComponent,
        RequestTrackerComponent,
        PaymentComponent,
        PaymentHelpComponent,
        ChallanComponent,
        RecieptComponent,
        SemesterRegistrationComponent,
        BatchAttendanceSummaryComponent,
        TimeTableComponent,
        StudentInfoUpdateRequestComponent,
        StudentProfileComponent,
        StudentProfileUpdateComponent,
        ChangePasswordComponent,
        CgpaConversionCertificateComponent,
        ServiceRequestListComponent,
        ServiceRequestViewComponent,
        ServiceRequestComponent,
        StudentFeedbackComponent,
        VerifyApaarComponent,
        ELearningComponent,
        DocumentCenterComponent,
        BonafiedJobComponent,
        BonafiedFeesComponent,
        BonafiedEKaliyanScholarshipComponent,
        CurriculumFrameworkComponent,
        PaymentResponseComponent,
    ],
})
export class StudentsModule {}
