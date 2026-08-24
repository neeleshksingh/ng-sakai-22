import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccessDeniedComponent } from '../global/components/exception-pages/access-denied/access-denied.component';
import { ForbiddenAccessComponent } from '../global/components/exception-pages/forbidden-access/forbidden-access.component';
import { InternalServerErrorComponent } from '../global/components/exception-pages/internal-server-error/internal-server-error.component';
import { LoginTokenExpiredComponent } from '../global/components/exception-pages/login-token-expired/login-token-expired.component';
import { AcademicResultComponent } from './components/academic-result/academic-result.component';
import { AdmitCardV2Component } from './components/admit-card-v2/admit-card-v2.component';
import { AdmitCardComponent } from './components/admit-card/admit-card.component';
import { BacklogExaminationApplicationComponent } from './components/backlog-examination-application/backlog-examination-application.component';
import { BacklogExaminationRegistrationComponent } from './components/backlog-examination-registration/backlog-examination-registration.component';
import { BatchAttendanceSummaryComponent } from './components/batch-attendance-summary/batch-attendance-summary.component';
import { BonafiedEKaliyanScholarshipComponent } from './components/bonafied-ekaliyan-scholarship/bonafied-ekaliyan-scholarship.component';
import { BonafiedFeesComponent } from './components/bonafied-fees/bonafied-fees.component';
import { BonafiedJobComponent } from './components/bonafied-job/bonafied-job.component';
import { ChallanComponent } from './components/challan/challan.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { CgpaConversionCertificateComponent } from './components/cgpa-conversion-certificate/cgpa-conversion-certificate.component';
import { DocumentCenterComponent } from './components/document-center/document-center.component';
import { ELearningComponent } from './components/e-learning/e-learning.component';
import { ExaminationRegistrationComponent } from './components/examination-registration/examination-registration.component';
import { ExaminationScrutinyApplicationComponent } from './components/examination-scrutiny-application/examination-scrutiny-application.component';
import { NoDuesCertificateComponent } from './components/no-dues-certificate/no-dues-certificate.component';
import { PaymentHelpComponent } from './components/payment-help/payment-help.component';
import { PaymentResponseComponent } from './components/payment-response/payment-response.component';
import { PaymentComponent } from './components/payment/payment.component';
import { RecieptComponent } from './components/reciept/reciept.component';
import { RequestTrackerComponent } from './components/request-tracker/request-tracker.component';
import { SearchBookComponent } from './components/search-book/search-book.component';
import { SemesterRegistrationComponent } from './components/semester-registration/semester-registration.component';
import { ServiceRequestListComponent } from './components/service-request-list/service-request-list.component';
import { ServiceRequestViewComponent } from './components/service-request-view/service-request-view.component';
import { ServiceRequestComponent } from './components/service-request/service-request.component';
import { StudentFeedbackComponent } from './components/student-feedback/student-feedback.component';
import { StudentInfoUpdateRequestComponent } from './components/student-info-update-request/student-info-update-request.component';
import { StudentProfileUpdateComponent } from './components/student-profile-update/student-profile-update.component';
import { StudentProfileComponent } from './components/student-profile/student-profile.component';
import { TimeTableComponent } from './components/time-table/time-table.component';
import { VerifyApaarComponent } from './components/verify-apaar/verify-apaar.component';
import { CurriculumFrameworkComponent } from './curriculum-framework/curriculum-framework.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StudentsComponent } from './students/students.component';
import { StudentSatisfactionSurveyComponent } from './components/student-satisfaction-survey/student-satisfaction-survey.component';
import { StudentProgramChangeRequestComponent } from './components/student-program-change-request/student-program-change-request.component';

const routes: Routes = [
    {
        path: '',
        component: StudentsComponent,

        children: [
            {
                path: 'forbidden-access',
                component: ForbiddenAccessComponent,
                data: { breadcrumb: 'Forbidden Access' },
            },
            {
                path: 'login-token-expired',
                component: LoginTokenExpiredComponent,
                data: { breadcrumb: 'Login Token Expired' },
            },
            {
                path: 'access-denied',
                component: AccessDeniedComponent,
                data: { breadcrumb: 'Access Denied' },
            },
            {
                path: 'internal-server-error',
                component: InternalServerErrorComponent,
                data: { breadcrumb: 'Internal Server Error' },
            },

            {
                path: 'dashboard',
                component: DashboardComponent,
                data: { breadcrumb: 'Dashboard' },
                title: 'Dashboard',
            },
            {
                path: 'examination-registration',
                component: ExaminationRegistrationComponent,
                data: { breadcrumb: 'Examination Registration' },
                title: 'Examination Registration',
            },
            {
                path: 'backlog-examination-application',
                component: BacklogExaminationApplicationComponent,
                data: { breadcrumb: 'Backlog Examination Application' },
                title: 'Backlog Examination Application',
            },
            // { path: 'backlog-examination-registration', component: BacklogExaminationRegistrationComponent, data: { breadcrumb: 'Backlog Examination Registration' }, title: "Backlog Examination Registration" },
            {
                path: 'academic-result',
                component: AcademicResultComponent,
                data: { breadcrumb: 'Academic Result' },
                title: 'Academic Result',
            },
            {
                path: 'admit-card',
                component: AdmitCardComponent,
                data: { breadcrumb: 'Admit Card' },
                title: 'Admit Card',
            },
            {
                path: 'admit-card/v2',
                component: AdmitCardV2Component,
                data: { breadcrumb: 'Admit Card V2' },
                title: 'Admit Card v2',
            },
            {
                path: 'scrutiny-application',
                component: ExaminationScrutinyApplicationComponent,
                data: { breadcrumb: 'Scrutiny Application' },
                title: 'Scrutiny Application',
            },
            {
                path: 'search-book',
                component: SearchBookComponent,
                data: { breadcrumb: 'Search Book' },
                title: 'Search Book',
            },
            // Accounts
            {
                path: 'payments',
                component: PaymentComponent,
                data: { breadcrumb: 'Payments' },
                title: 'Payments',
            },
            {
                path: 'payment-help',
                component: PaymentHelpComponent,
                data: { breadcrumb: 'Payment Help' },
                title: 'Payment Help',
            },
            {
                path: 'challan',
                component: ChallanComponent,
                data: { breadcrumb: 'Challan' },
                title: 'Challan',
            },
            {
                path: 'reciept',
                component: RecieptComponent,
                data: { breadcrumb: 'Reciept' },
                title: 'Reciept',
            },
            {
                path: 'payments/payment-response/:paymentResponseId',
                component: PaymentResponseComponent,
                data: { title: 'Payment Success' },
            },
            // { path: 'reciept/v2', component: ReceiptV2Component, data: { breadcrumb: 'Reciept' }, title:"Reciept" },
            // Academics
            {
                path: 'semester-registration',
                component: SemesterRegistrationComponent,
                data: { breadcrumb: 'Semester Registration' },
                title: 'Semester Registration',
            },
            {
                path: 'batch-attendence-summary',
                component: BatchAttendanceSummaryComponent,
                data: { breadcrumb: 'Batch Attendence Summary' },
                title: 'Batch Attendence Summary',
            },
            {
                path: 'curriculum-framework',
                component: CurriculumFrameworkComponent,
                data: { breadcrumb: 'Curriculum Framework' },
                title: 'CurriculumFramework',
            },
            {
                path: 'time-table',
                component: TimeTableComponent,
                data: { breadcrumb: 'Time Table' },
                title: 'Time Table',
            },

            {
                path: 'request-tracker',
                component: RequestTrackerComponent,
                data: { breadcrumb: 'Request Tracker' },
                title: 'Request Tracker',
            },
            {
                path: 'student-info-update-request',
                component: StudentInfoUpdateRequestComponent,
                data: { breadcrumb: 'Student Info Update Request' },
                title: 'Student Info Update Request',
            },
            {
                path: 'service-request-list',
                component: ServiceRequestListComponent,
                data: { breadcrumb: 'Service Request List' },
                title: 'Service Request List',
            },
            {
                path: 'service-request-view/:id',
                component: ServiceRequestViewComponent,
                data: { breadcrumb: 'Service Request View' },
                title: 'Service Request View',
            },
            {
                path: 'service-request',
                component: ServiceRequestComponent,
                data: { breadcrumb: 'Service Request' },
                title: 'Service Request',
            },
            {
                path: 'student-feedback',
                component: StudentFeedbackComponent,
                data: { breadcrumb: 'Student Feedback' },
                title: 'Student Feedback',
            },
            {
                path: 'student-satisfaction-survey',
                component: StudentSatisfactionSurveyComponent,
                data: { breadcrumb: 'Student Satisfaction Survey' },
                title: 'Student Satisfaction Survey',
            },
            {
                path: 'e-learning',
                component: ELearningComponent,
                data: { breadcrumb: 'E-Learning' },
                title: 'E-Learning',
            },
            {
                path: 'document-center',
                component: DocumentCenterComponent,
                data: { breadcrumb: 'Document Center' },
                title: 'Document Center',
            },
            {
                path: 'student-program-change-request',
                component: StudentProgramChangeRequestComponent,
                data: { breadcrumb: 'Student Program Change Request' },
                title: 'Student Program Change Request',
            },

            // Settings
            {
                path: 'student-profile',
                component: StudentProfileComponent,
                data: { breadcrumb: 'Student Profile' },
                title: 'Student Profile',
            },
            {
                path: 'student-profile-update',
                component: StudentProfileUpdateComponent,
                data: { breadcrumb: 'Student Profile Update' },
                title: 'Student Profile Update',
            },
            {
                path: 'verify-apaar',
                component: VerifyApaarComponent,
                data: { breadcrumb: 'Verify ABC ID' },
                title: 'Verify ABC ID',
            },

            {
                path: 'change-password',
                component: ChangePasswordComponent,
                data: { breadcrumb: 'Change Password' },
                title: 'Change Password',
            },
            {
                path: 'bonafied-job',
                component: BonafiedJobComponent,
                data: { breadcrumb: 'Bonafied Job' },
                title: 'Bonafied Job',
            },
            {
                path: 'bonafied-fees',
                component: BonafiedFeesComponent,
                data: { breadcrumb: 'Bonafied Fees' },
                title: 'Bonafied Fees',
            },
            {
                path: 'bonafied-e-kaliyan-scholarship',
                component: BonafiedEKaliyanScholarshipComponent,
                data: { breadcrumb: 'Bonafide E-Kalyan' },
                title: 'Bonafide E-Kalyan',
            },
            {
                path: 'no-dues-certificate',
                component: NoDuesCertificateComponent,
                data: { breadcrumb: 'No Dues Certificate' },
                title: 'No Dues Certificate',
            },
            {
                path: 'cgpa-conversion-certificate',
                component: CgpaConversionCertificateComponent,
                data: { breadcrumb: 'CGPA to % Conversion Certificate' },
                title: 'CGPA to % Conversion Certificate',
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class StudentsRoutingModule { }
