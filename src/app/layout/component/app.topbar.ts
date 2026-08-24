import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { MenuItem } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { StyleClassModule } from 'primeng/styleclass';
import { BehaviorSubject, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { LayoutService } from '@/app/layout/service/layout.service';
import { EventLogoService } from '@/app/shared/services/event-logo.service';
import { EmployeeDetailsService } from '@/app/global/services/smallbiz-gurus/employee-details.service';
import { StudentProfileActions } from 'src/app/store/actions/student-profile.actions';
import { selectStudentDob } from 'src/app/store/selectors/student-profile.selectors';
import { AppBreadcrumb } from './app.breadcrumb';
import { AppConfigurator } from './app.configurator';
import { BirthdayAnimationComponent } from '../animation/birthday-animation/birthday-animation.component';
import { NewYearComponent } from '../animation/new-year/new-year.component';
import { FoundationDayComponent } from '../animation/foundation-day/foundation-day.component';
import { NationalDaysService } from '../service/animation.service';

@Component({
    selector: 'app-topbar',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        InputTextModule,
        StyleClassModule,
        AppBreadcrumb,
        AppConfigurator,
        BirthdayAnimationComponent,
        NewYearComponent,
        FoundationDayComponent
    ],
    templateUrl: './app.topbar.html',
    styleUrl: './app.topbar.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppTopbar implements OnInit, OnDestroy {
    menu: MenuItem[] = [];
    @ViewChild('searchinput') searchInput!: ElementRef;
    @ViewChild('menubutton') menuButton!: ElementRef;
    searchActive: boolean = false;
    lastLoggedInUser: any;
    displayImageUrl: string = '';
    UserName: any;
    UserRole: any;
    defaultImage: string = '';
    topBarRouterLink: string = '';
    currentLogo: string = '';
    isFlipped: boolean = false;
    showGreeting: boolean = false;
    animationGifPath: string = '';
    hasSeenAnimation = false;
    janmasthami: string = 'assets/animations/Janmasthami.png';
    showAnimation: boolean = false;
    isBirthday: boolean = false;
    foundationDay: boolean = false;
    pCode: string = (environment as any).partner?.partnerCode || '';
    isJharkhandFoundationDay: boolean = false;

    private currentUserSubject = new BehaviorSubject<any>(this.getSafeParsedStorage('currentUser'));
    currentUser: any;

    private destroy$ = new Subject<void>();
    private logoTimeouts: any[] = [];
    gifPath = '';
    staticLastFramePath = '';

    // timings (ms)
    initialDelay = 5000;
    gifDisplayDuration = 3500;
    gifPlayDuration = 3500;

    readonly layoutService = inject(LayoutService);
    private readonly router = inject(Router);
    private readonly employeeDetailsService = inject(EmployeeDetailsService);
    private readonly store = inject(Store);
    private readonly eventLogoService = inject(EventLogoService);
    private readonly nationalDaysService = inject(NationalDaysService);
    private readonly cdr = inject(ChangeDetectorRef);

    searchQuery = '';

    private getSafeParsedStorage(key: string): any {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        } catch {
            return null;
        }
    }

    ngOnInit(): void {
        const lastLoggedInUserStr = localStorage.getItem('lastLoggedInUser');
        this.displayImageUrl = `assets/images/default-pic.jpg`;
        this.currentUser = this.getSafeParsedStorage('currentUser');

        const UserRole = this.currentUser?.applicationUser?.roles?.[0];
        if (UserRole?.toUpperCase() === 'STUDENT') {
            this.topBarRouterLink = '/home/students/dashboard';
            this.store.dispatch(StudentProfileActions.loadStudentProfile());
            this.store
                .select(selectStudentDob)
                .pipe(
                    filter((dob): dob is string => !!dob),
                    takeUntil(this.destroy$)
                )
                .subscribe((dob) => {
                    this.checkBirthday(dob);
                    this.cdr.markForCheck();
                });
        } else {
            this.topBarRouterLink = '/home/dashboard';
            if (this.currentUser?.applicationUser?.uniqueUserCode !== undefined && this.currentUser?.applicationUser?.uniqueUserCode !== null) {
                this.employeeDetailsService.getByEmployeeCode(this.currentUser.applicationUser.uniqueUserCode).subscribe((data) => {
                    this.checkBirthday(data?.dateOfBirth);
                    this.cdr.markForCheck();
                });
            }
        }

        if (this.currentUser && this.currentUser.applicationUser) {
            this.UserName = this.currentUser.applicationUser.displayName;
            const roles = this.currentUser.applicationUser.roles;
            this.UserRole = Array.isArray(roles) && roles.length > 0 ? roles[0] : 'No role assigned';
        }

        if (this.currentUser?.applicationUser?.gender === 'Male') {
            this.defaultImage = 'assets/images/male-user.svg';
        } else if (this.currentUser?.applicationUser?.gender === 'Female') {
            this.defaultImage = 'assets/images/female-user.svg';
        } else {
            this.defaultImage = 'assets/images/user.svg';
        }

        this.lastLoggedInUser = lastLoggedInUserStr ? this.getSafeParsedStorage('lastLoggedInUser') : { displayImageUrl: '', userName: '' };
        if (localStorage.getItem('employeeDetails') === null || localStorage.getItem('employeeDetails') === undefined) {
            if (this.currentUser?.applicationUser?.roles && !this.currentUser.applicationUser.roles.includes('Student') && this.currentUser.applicationUser.uniqueUserCode !== undefined) {
                this.employeeDetailsService.getByEmployeeCode(this.currentUser.applicationUser.uniqueUserCode).subscribe((data) => {
                    localStorage.setItem('employeeDetails', JSON.stringify(data));
                    const employeeDetails = this.getSafeParsedStorage('employeeDetails');
                    this.displayImageUrl = employeeDetails?.employeePhotoUrl ?? this.defaultImage;
                    this.cdr.markForCheck();
                });
            }
        }

        this.displayImageUrl = this.lastLoggedInUser?.displayImageUrl?.length > 0
            ? this.lastLoggedInUser.displayImageUrl
            : this.defaultImage;

        // Initialize logo
        this.currentLogo = this.logo;
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
            // Default logo behavior
            this.currentLogo = this.logo;
        }

        this.updateButtonState();
        this.showAnimation = this.eventLogoService.checkEventDate();
        this.foundationDay = this.eventLogoService.checkFoundationDay();
        this.isJharkhandFoundationDay = this.eventLogoService.checkJharkhandFoundationDay();
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
        this.clearLogoTimeouts();
    }

    startEventLogoFlip() {
        this.clearLogoTimeouts();

        if (this.gifPath === this.logo) {
            this.currentLogo = this.logo;
            return;
        }

        const cycleToGif = () => {
            this.isFlipped = true;
            this.currentLogo = this.gifPath;
            this.cdr.markForCheck();

            const tFreeze = setTimeout(() => {
                this.currentLogo = this.staticLastFramePath;
                this.cdr.markForCheck();
            }, this.gifPlayDuration);
            this.logoTimeouts.push(tFreeze);

            const tBackToLogo = setTimeout(() => {
                this.isFlipped = false;
                this.currentLogo = this.logo;
                this.cdr.markForCheck();

                const tNext = setTimeout(() => cycleToGif(), this.initialDelay);
                this.logoTimeouts.push(tNext);
            }, this.gifDisplayDuration);
            this.logoTimeouts.push(tBackToLogo);
        };

        const tStart = setTimeout(() => cycleToGif(), this.initialDelay);
        this.logoTimeouts.push(tStart);
    }

    private clearLogoTimeouts() {
        this.logoTimeouts.forEach((id) => clearTimeout(id));
        this.logoTimeouts = [];
    }

    onMenuButtonClick() {
        this.layoutService.onMenuToggle();
    }

    activateSearch() {
        this.searchActive = true;
        setTimeout(() => {
            if (this.searchInput) {
                this.searchInput.nativeElement.focus();
            }
        }, 100);
    }

    deactivateSearch() {
        this.searchActive = false;
    }

    removeTab(event: MouseEvent, item: MenuItem, index: number) {
        if ((this.layoutService as any).onTabClose) {
            (this.layoutService as any).onTabClose(item, index);
        }
        event.preventDefault();
    }

    get layoutTheme(): string {
        return (this.layoutService as any).config?.()?.layoutTheme || '';
    }

    get colorScheme(): string {
        return (this.layoutService as any).config?.()?.colorScheme || '';
    }

    get logo(): string {
        const partnerLogo = (environment as any).partner?.logo_url;
        return partnerLogo || '';
    }

    onImageError(event: any) {
        if (this.currentUser?.applicationUser?.gender === 'Male') {
            event.target.src = 'assets/images/male-user.svg';
        } else if (this.currentUser?.applicationUser?.gender === 'Female') {
            event.target.src = 'assets/images/female-user.svg';
        } else {
            event.target.src = 'assets/images/user.svg';
        }
    }

    get tabs(): MenuItem[] {
        return (this.layoutService as any).tabs || [];
    }

    logOut() {
        this.router.navigateByUrl('/logout');
    }

    Developers() {
        this.router.navigateByUrl('/home/developers/dashboard/dashboard');
    }

    onSettingsClick() {
        if (this.UserRole === 'Student') {
            this.router.navigateByUrl('/home/students/student-profile-update');
        } else {
            this.router.navigateByUrl('/home/settings');
        }
    }

    onProfileClick() {
        if (this.UserRole === 'Student') {
            this.router.navigateByUrl('/home/students/student-profile');
        } else {
            this.router.navigateByUrl('/home/smallbizgurus/employees/employee/Profile');
        }
    }

    onLogoClick() {
        if (this.hasSeenAnimation) {
            this.nationalDaysService.triggerAnimation();
        } else {
            this.nationalDaysService.resetAnimationState();
            this.updateButtonState();
        }
    }

    private updateButtonState(): void {
        this.hasSeenAnimation = this.nationalDaysService.hasSeenAnimation();
    }

    checkBirthday(dob: any) {
        if (!dob) return;
        const today = new Date();
        const birthDate = new Date(dob);

        if (today.getMonth() === birthDate.getMonth() && today.getDate() === birthDate.getDate()) {
            this.isBirthday = true;
        } else {
            this.isBirthday = false;
        }
    }

    toggleDarkMode(): void {
        this.layoutService.layoutConfig.update((state) => ({ ...state, darkTheme: !state.darkTheme }));
    }
}

