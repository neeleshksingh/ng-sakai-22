import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { SharedModule } from '@/shared.module';
import { LocalstorageService } from 'src/app/shared/services/local-storage.service';
import { environment } from 'src/environments/environment';
import { StudentOnboardingLoginService } from '../../services/bigleads/student-onboarding-login.service';

@Component({
  selector: 'app-student-onboarding-login',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './student-onboarding-login.component.html',
  styleUrl: './student-onboarding-login.component.scss'
})
export class StudentOnboardingLoginComponent {
  onboardingLoginFormGroup!: FormGroup;
  title: string = '';
  slogan: string = '';
  onboardingLoginMessage: string = '';
  isOtpdisable: boolean = false;
  supportEmailId: string = '';
  alertMessage: string = '';
  logoUrl: string = '';
  city: string = ''
  isSendingOtp: boolean = false;
  isVerifyingOtp: boolean = false;


  constructor(private fb: FormBuilder,
    private router: Router,
    private studentOnboardingLoginService: StudentOnboardingLoginService,
    private messageService: MessageService,
    private localstorageService: LocalstorageService) { }

  ngOnInit(): void {
    this.getPartnerInfo();
    this.initializeBuildingFormGroup();
    var matchedPartner = environment.partner;
    this.supportEmailId = matchedPartner.supportEmailId;
    this.alertMessage = matchedPartner.alertMessage;
    this.logoUrl = 'assets/sbu-logo.jpg';
    this.resumeOnboardingSession();
  }
  initializeBuildingFormGroup() {
    this.onboardingLoginFormGroup = this.fb.group({
      userName: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      otp: ['', [Validators.required, Validators.pattern(/^[0-9]{6}$/)]],
    });
  }
  getPartnerInfo() {
    this.slogan = environment.partner.sloganText;
    this.title = environment.partner.title;
    this.city = environment.partner.city;
  }

  private resumeOnboardingSession(): void {
    for (let index = 0; index < localStorage.length; index++) {
      const storageKey = localStorage.key(index);
      if (!storageKey) {
        continue;
      }

      const storedData = this.localstorageService.getItem(storageKey);
      if (storedData &&
        storageKey === `${storedData.provisionalNumber}_${storedData.phoneNumber}_${storedData.emailAddress}`) {
        this.router.navigate([
          `admissions/student-onboarding/student-onboarding-overview/0/${storedData.provisionalNumber}/${storedData.phoneNumber}/${storedData.emailAddress}`
        ]);
        return;
      }
    }
  }

  sendLoginOtp() {
    this.isSendingOtp = true;
    this.studentOnboardingLoginService.sendLoginOtp(this.onboardingLoginFormGroup.value).subscribe({
      next: (response: any) => {
        this.isSendingOtp = false;
        this.isOtpdisable = true;
        this.messageService.add({ severity: 'success', summary: 'success', detail: 'OTP sent to your mobile', life: 3000 })
      }, error: (error) => {
        this.isSendingOtp = false;
        if (error.status === 400) {
          const errorMessage = 'Dear Student, Please verify that the phone number provided is correct and try submitting again.';
          this.messageService.add({ severity: 'error', summary: 'Error', detail: errorMessage, life: 3000 })
          return;
        } else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error, life: 3000 })
        }
      }
    })
  }

  editUserName() {
    this.isOtpdisable = false;
  }

  validateLoginOtp() {
    this.isVerifyingOtp = true;
    this.studentOnboardingLoginService.validateLoginOtp(this.onboardingLoginFormGroup.value).subscribe({
      next: (response: any) => {
        this.isVerifyingOtp = false;
        const storageKey = `${response.provisionalNumber}_${response.phoneNumber}_${response.emailAddress}`;
        this.localstorageService.setItem(storageKey, response);
        this.router.navigate([`admissions/student-onboarding/student-onboarding-overview/0/${response.provisionalNumber}/${response.phoneNumber}/${response.emailAddress}`]);
      }, error: (error) => {
        this.isVerifyingOtp = false;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message, life: 3000 })
      }
    })
  }
}
