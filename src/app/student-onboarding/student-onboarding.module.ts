import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from "../shared.module";
import { FeeReceiptComponent } from "./component/fee-receipt/fee-receipt.component";
import { PaymentSuccessComponent } from "./component/payment-success/payment-success.component";
import { StudentOnboardingLoginComponent } from "./component/student-onboarding-login/student-onboarding-login.component";
import { StudentProgramProvisionalLandingComponent } from "./component/student-program-provisional-landing/student-program-provisional-landing.component";
import { StudentOnboardingRoutingModule } from "./student-onboarding-routing.module";


@NgModule({
    imports: [
        CommonModule,
        StudentOnboardingRoutingModule,
        SharedModule,
        StudentOnboardingLoginComponent,
        StudentProgramProvisionalLandingComponent,
        PaymentSuccessComponent,
        FeeReceiptComponent
    ],
    declarations: [
    ],
    providers: [
    ],
    exports: [
    ]
})
export class StudentOnboardingModule { }