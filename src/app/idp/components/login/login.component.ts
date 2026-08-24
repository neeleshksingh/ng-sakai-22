import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { LoginRequest, RequestOTP, UpdatePassword, UserLogin, ValidateOTP } from 'src/app/shared/models/idp/login';
import { EventLogoService } from 'src/app/shared/services/event-logo.service';
import { loadPermissions } from 'src/app/store/actions/permissions.actions';
import { SURVEY_URL_CONFIG_EMPLOYEES, SURVEY_URL_CONFIG_STUDENTS } from 'src/app/shared/services/feedback-survey-pending.service';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from '../../services/authentication-service.service';
import { SharedModule } from '@/shared.module';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [SharedModule],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

    loginFormGroup!: FormGroup;
    loginRequest: LoginRequest | undefined;
    loginMessage: string = "";
    url: any = ''
    image_Url: any = environment.partner.logo_url;
    slogan: string = environment.partner.sloganText;
    title: string = environment.partner.title;
    city: string = environment.partner.city;
    supportEmailId: string = environment.partner.supportEmailId;
    alertMessage: string = environment.partner.alertMessage;
    case: string = 'case1';
    phoneNumber: any = '';
    disable: boolean = true;
    username: string = "";
    loading: boolean = false;
    newPasswordCreated: string = "No";
    rightDefaultLogo: string = "../../../../assets/images/default-pic.jpg";

    lastLoggedInUser: any;
    showPassword: boolean = false;
    showConfirmPassword: boolean = false;

    isFlipped: boolean = false;
    currentLogo: string = '';
    private logoTimeouts: any[] = [];
    gifPath = '';
    staticLastFramePath = '';
    showGreeting: boolean = false;
    animationGifPath: string = '';

    initialDelay = 5000;
    gifDisplayDuration = 6000;
    gifPlayDuration = 2600;

    foundationDay: boolean = false;

    timer: number = 60;
    private timerInterval: any;

    constructor(private fb: FormBuilder,
        private route: ActivatedRoute,
        private authenticationService: AuthenticationService,
        private eventLogoService: EventLogoService,
        private router: Router, private routes: ActivatedRoute, location: Location,
        private store: Store
    ) {
    }

    ngOnInit(): void {
        var isBrowserNeedsRefresh = localStorage.getItem("IsBrowserNeedsRefresh");
        if (isBrowserNeedsRefresh == "true") {
            localStorage.setItem("IsBrowserNeedsRefresh", "false");
            window.location.reload();
        }

        if (this.authenticationService.currentUserValue?.tokenInfo) {
            this.router.navigateByUrl('/home/dashboard');
        }

        this.initializeBuildingFormGroup();
        //commented below line to fix build error - Angular 18 - dated 24th Aug 2024
        // this.authenticationService.getPosition().subscribe(pos => {
        //  
        // });

        this.url = window.location.href.toLocaleLowerCase();

        const partner = environment.partner;
        if (partner && this.url.includes(partner.shortName.toLowerCase())) {
            this.image_Url = partner.logo_url ? partner.logo_url : this.image_Url;
            this.slogan = partner.sloganText;
            this.title = partner.title;
            this.city = partner.city;
            this.alertMessage = partner.alertMessage;
            this.supportEmailId = partner.supportEmailId
        }

        var lastLoggedInUserStr = localStorage.getItem("lastLoggedInUser") ?? "";
        if (lastLoggedInUserStr?.length > 0) {
            this.lastLoggedInUser = JSON.parse(lastLoggedInUserStr)
            if (!this.lastLoggedInUser) {
                this.lastLoggedInUser = { displayImageUrl: this.image_Url, userName: '' };
            }
        }
        else {
            this.lastLoggedInUser = { displayImageUrl: this.image_Url, userName: this.lastLoggedInUser?.userName };
        }

        this.currentLogo = this.image_Url;
        // Start logo flipping interval
        const currentEvent = this.eventLogoService.getCurrentEvent();
        if (currentEvent) {
            this.showGreeting = true;
            this.gifPath = currentEvent.gifPath;
            this.animationGifPath = currentEvent.animationGifPath || '';
            this.staticLastFramePath = currentEvent.staticLastFramePath;
            this.initialDelay = currentEvent.initialDelay;
            this.gifDisplayDuration = currentEvent.gifDisplayDuration;
            this.gifPlayDuration = currentEvent.gifPlayDuration;
            this.startEventLogoFlip();
        } else {
            this.currentLogo = this.image_Url;
        };
        this.foundationDay = this.eventLogoService.checkFoundationDay();
    }

    initializeBuildingFormGroup() {
        this.loginFormGroup = this.fb.group({
            userName: [this.lastLoggedInUser?.userName || '', Validators.required],
            password: ['', Validators.required],
        });
    }

    togglePassword() {
        this.showPassword = !this.showPassword;
    }

    toggleConfirmPassword() {
        this.showConfirmPassword = !this.showConfirmPassword;
    }

    onImageError(event: any) {
        event.target.src = this.rightDefaultLogo;
    }

    onSubmit() {
        this.loading = true;
        this.loginRequest = {
            userName: this.loginFormGroup ? this.loginFormGroup.value.userName : '',
            password: this.loginFormGroup ? this.loginFormGroup.value.password : ''
        };

        const userName = this.loginFormGroup.value.userName;
        const password = this.loginFormGroup.value.password;

        this.authenticationService.signIn(this.loginRequest)
            .subscribe(response => {
                localStorage.setItem('currentUser', JSON.stringify(response));

                localStorage.setItem('lastLoggedInUser', JSON.stringify({ displayImageUrl: response?.applicationUser?.displayImageUrl, userName: response?.applicationUser?.userName }));

                const userRole = response?.applicationUser?.roles?.[0];
                const surveyUrls = [
                    ...SURVEY_URL_CONFIG_STUDENTS.map(c => c.url),
                    ...SURVEY_URL_CONFIG_EMPLOYEES.map(c => c.url),
                ];
                var returnUrl = "";
                if (userRole && userRole.toUpperCase() == 'STUDENT') {
                    const raw = this.route.snapshot.queryParams['returnUrl'];
                    returnUrl = (raw && !surveyUrls.includes(raw)) ? raw : '/home/students/dashboard';
                } else {
                    const raw = this.route.snapshot.queryParams['returnUrl'];
                    returnUrl = (raw && !surveyUrls.includes(raw)) ? raw : '/home/dashboard';
                    this.store.dispatch(loadPermissions());
                }

                this.router.navigateByUrl(returnUrl);
            },
                error => {
                    this.loading = false;
                    if (error.error.detail) {
                        this.loginMessage = error.error.detail;
                    } else if (error.error.message) {
                        if (error.error.message.includes("Invalid credentials")) {
                            this.loginMessage = error.error.message + " Check the password";
                        } else {
                            this.loginMessage = error.error.message;
                        }
                    } else {
                        this.loginMessage = "Internal Server Error !";
                    }

                    if (this.loginMessage.includes('User ') && this.loginMessage.includes(', Invalid credentials.')) {
                        const start_index: number = this.loginMessage.indexOf('User ') + 'User '.length;
                        const end_index: number = this.loginMessage.indexOf(', Invalid credentials.');
                        const extracted_part: string = this.loginMessage.substring(start_index, end_index);

                        if (this.loginFormGroup?.controls['userName']?.value !== extracted_part) {
                            this.loginMessage = "Incorrect Username";
                        }
                    }
                }
            );
    }

    Forgot_Password() {
        this.loginMessage = "";
        this.case = 'case2';
        this.loginMessage = "";
    }

    goback() {
        this.case = 'case1'
        this.loading = false
        this.loginMessage = "";
    }

    loginWithOTP() {
        this.loginMessage = "";
        this.loading = false;
        this.case = "case3"
    }

    gobacktoOTP() {
        if (this.timer === 0) {
            this.loginMessage = "";
            this.case = "case3";
            // Reset timer for next time
            this.timer = 60;
            if (this.timerInterval) {
                clearInterval(this.timerInterval);
            }
        }
    }

    gobackToForgotPassword() {
        this.case = "case2";
        this.loginMessage = "";
    }

    GetOtp(val: string) {
        this.loading = true
        const payload: UserLogin = {
            userName: val,
        };
        this.username = val;
        this.authenticationService.SendOtpForgotPasswordOtpRequest(payload).subscribe(
            res => {
                this.case = "case5";
                this.loading = false;
                this.loginMessage = '';
            },
            error => {
                this.loading = false;
                this.loginMessage = error.error.message;
            }
        );
    }

    validNumber(val: any) {
        const numberString = val.replace(/[^0-9]/g, '');

        if (numberString.length === 10) {
            this.disable = false;
        } else {
            this.disable = true;
        }
    }

    requestOTP(val: any) {
        this.loading = true;
        const payload: RequestOTP = {
            phoneNumber: val,
            OTP: "1234"
        };
        this.phoneNumber = val
        this.authenticationService.sendOTPToUserPhoneNumber(payload).subscribe(
            res => {
                this.loginMessage = "";
                this.case = "case4";
                this.loading = false;
                this.startTimer();
            },
            error => {
                this.loading = false;
                this.loginMessage = error.error.message;
            }
        );
    }

    confirmOTP(val: string) {
        this.loading = true;

        const payload: ValidateOTP = {
            phoneNumber: this.phoneNumber,
            otp: val
        };
        this.authenticationService.LoginWithOTP(payload)
            .subscribe({
                next: (response) => {
                    // Clear timer on successful login
                    if (this.timerInterval) {
                        clearInterval(this.timerInterval);
                    }

                    localStorage.setItem('currentUser', JSON.stringify(response));
                    localStorage.setItem('lastLoggedInUser', JSON.stringify({
                        displayImageUrl: response.applicationUser.displayImageUrl,
                        userName: response.applicationUser.userName
                    }));

                    const userRole = response?.['applicationUser']?.roles?.[0];

                    if (userRole && userRole.toUpperCase() == 'STUDENT') {
                        this.router.navigateByUrl('/home/students/dashboard');
                    } else {
                        this.router.navigateByUrl('/home/dashboard');
                        this.store.dispatch(loadPermissions());
                    }
                },
                error: (err) => {
                    this.loading = false;
                    this.loginMessage = err.error.message;

                    // Reset timer and enable go back button on error
                    if (this.timerInterval) {
                        clearInterval(this.timerInterval);
                    }
                    this.timer = 0; // Set to 0 to immediately enable the button
                }
            });
    }

    Completed_Go_To_Login() {
        this.case = 'case1';
        this.loginMessage = "";
    }

    changePassword(userOTP: any, userPassword: any, userConfirmPassword: any) {
        this.loading = true;
        if (!userOTP || !userPassword || !userConfirmPassword) {
            this.loginMessage = "Enter All Details";
            this.loading = false;
            return
        } else if (userPassword != userConfirmPassword) {
            this.loginMessage = "Password doesn't matched";
            this.loading = false;
            return
        }

        const payload: UpdatePassword = {
            userName: this.username,
            phoneNumber: "0123456789",
            otp: userOTP,
            password: userPassword,

        };

        this.authenticationService.UpdatePasswordByForgotPasswordUpdateRequest(payload)
            .subscribe(response => {
                this.loginMessage = "Password changed successfully";
                this.case = "case6";
                this.loading = false;
            },
                error => {
                    this.loading = false;
                    if (error.error.Message === 'Object reference not set to an instance of an object.') {
                        this.loginMessage = 'Otp is incorrect, please enter correct otp'
                    } else if (error.error.Message === 'Password reset failed: PasswordRequiresNonAlphanumeric: Passwords must have at least one non alphanumeric character.') {
                        this.loginMessage = 'Password must be in proper format it must contain at least one alphanumeric character and at least one symbol.'
                    } else if (error.error.Message === "Password reset failed: PasswordRequiresUpper: Passwords must have at least one uppercase ('A'-'Z').") {
                        this.loginMessage = "Passwords must have at least one uppercase ('A'-'Z').";
                    } else if (error.error.Message === "Password reset failed: PasswordTooShort: Passwords must be at least 6 characters.") {
                        this.loginMessage = "Passwords must be at least 6 characters";
                    } else {
                        this.loginMessage = error.error.Message;
                    }
                });
    }

    startEventLogoFlip() {
        this.clearLogoTimeouts();

        if (this.gifPath === this.image_Url) {
            this.currentLogo = this.image_Url;
            return;
        }

        const cycleToGif = () => {
            this.isFlipped = true;
            this.currentLogo = this.gifPath;

            const tFreeze = setTimeout(() => {
                this.currentLogo = this.staticLastFramePath;
            }, this.gifPlayDuration);
            this.logoTimeouts.push(tFreeze);

            const tBackToLogo = setTimeout(() => {
                this.isFlipped = false;
                this.currentLogo = this.image_Url;
                const tNext = setTimeout(() => cycleToGif(), this.initialDelay);
                this.logoTimeouts.push(tNext);
            }, this.gifDisplayDuration);
            this.logoTimeouts.push(tBackToLogo);
        };

        const tStart = setTimeout(() => cycleToGif(), this.initialDelay);
        this.logoTimeouts.push(tStart);
    }

    private clearLogoTimeouts() {
        this.logoTimeouts.forEach(id => clearTimeout(id));
        this.logoTimeouts = [];
    }

    startTimer() {
        this.timer = 60;
        this.timerInterval = setInterval(() => {
            if (this.timer > 0) {
                this.timer--;
            } else {
                clearInterval(this.timerInterval);
            }
        }, 1000);
    }

    ngOnDestroy() {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
        }
    }
}