import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared.module';
import { PaymentSuccessComponent } from './component/payment-success/payment-success.component';
import { StudentOnboardingLoginComponent } from './component/student-onboarding-login/student-onboarding-login.component';
import { StudentProgramProvisionalLandingComponent } from './component/student-program-provisional-landing/student-program-provisional-landing.component';


const routes: Routes = [
    { path: 'login', component: StudentOnboardingLoginComponent, title: 'Student Onboarding Login' },
    { path: 'student-onboarding-overview/:tab/:provisionalNumber/:phoneNumber/:email', component: StudentProgramProvisionalLandingComponent, title: 'Student Onboarding Landing' },
    { path: 'payment-success/paymentResponse/:paymentResponseId/admission-number/:provisionalNumber/phone-number/:phoneNumber/email/:email', component: PaymentSuccessComponent, title: 'Payment Success' },
    // { path: 'withdrawal/:provisionalNumber/:phoneNumber/:email', component: StudentProgramProvisionalLandingComponent, data: { title: 'Student Onboarding Withdraw' } },
    //  { path: 'AccessDenied', component: AccessDeniedComponent, data: { title: 'Access Denied' } },
];
@NgModule({
    imports: [SharedModule, RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class StudentOnboardingRoutingModule {
}