import { Component, ChangeDetectionStrategy, OnInit, OnDestroy } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { LazyLoaderComponent } from './app/global/components/lazy-loader/lazy-loader.component';
import { filter, Subscription } from 'rxjs';
import { AuthenticationService } from './app/idp/services/authentication-service.service';
import { MessageService } from 'primeng/api';
import { PrimeNG } from 'primeng/config';
import { Store } from '@ngrx/store';
import { UserFeedbackSurveyTrackingStudentsService } from './app/students/services/user-feedback-survey-tracking.service';
import { UserFeedbackSurveyTrackingGlobalService } from './app/global/services/common/user-feedback-survey-tracking.service';
import { FeedbackSurveyPendingService } from './app/shared/services/feedback-survey-pending.service';
import { SignalRService } from './app/shared/services/signal-r.service';
import { loadPermissions } from './app/store/actions/permissions.actions';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterModule, ConfirmDialogModule, ToastModule, LazyLoaderComponent],
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy {

    private feedbackApiSub?: Subscription;
    private feedbackInitialized = false;

    constructor(private primeng: PrimeNG, private router: Router,
        private authenticationService: AuthenticationService,
        private messageService: MessageService,
        private store: Store,
        public signalRService: SignalRService,
        private userFeedbackSurveyTrackingStudentsService: UserFeedbackSurveyTrackingStudentsService,
        private userFeedbackSurveyTrackingGlobalService: UserFeedbackSurveyTrackingGlobalService,
        private feedbackSurveyPendingService: FeedbackSurveyPendingService) { }

    ngOnInit(): void {
        this.signalRService.startConnection();
        this.primeng.ripple.set(true);
        const applicationUserStr = localStorage.getItem('currentUser');
        const applicationUser = applicationUserStr ? JSON.parse(applicationUserStr) : null;
        const roles: string[] = applicationUser?.applicationUser?.roles || [];

        if (roles.length > 0 && !roles.some(role => role.toLowerCase() === 'student')) {
            this.store.dispatch(loadPermissions());
        }

        this.router.events.pipe(
            filter(event => event instanceof NavigationEnd)
        ).subscribe((event: any) => {
            const url: string = event.urlAfterRedirects || event.url;
            const cleanUrl = url.split('?')[0];
            if (cleanUrl === '/login' || cleanUrl === '/' || cleanUrl === '/logout') {
                // User went back to login — reset so next login triggers a fresh check
                this.feedbackInitialized = false;
                this.feedbackApiSub?.unsubscribe();
                this.feedbackSurveyPendingService.reset();
                return;
            }
            if (url.startsWith('/home/') && !this.feedbackInitialized) {
                this.feedbackInitialized = true;
                const userStr: any = localStorage.getItem('currentUser');
                const currentUser = userStr ? JSON.parse(userStr) : null;
                const userRole = currentUser?.applicationUser?.roles?.[0];
                const feedbackToken = this.feedbackSurveyPendingService.reset();
                if (userRole?.toUpperCase() === 'STUDENT') {
                    this.feedbackApiSub = this.userFeedbackSurveyTrackingStudentsService.getFeedbackSurveyTracking().subscribe({
                        next: data => {
                            if (data) this.feedbackSurveyPendingService.initFromTracking(data, feedbackToken);
                        },
                        error: () => { }
                    });
                } else if (userRole) {
                    this.feedbackApiSub = this.userFeedbackSurveyTrackingGlobalService.getFeedbackSurveyTracking().subscribe({
                        next: data => {
                            if (data) this.feedbackSurveyPendingService.initFromTracking(data, feedbackToken);
                        },
                        error: () => { }
                    });
                }
            }
        });

        if (this.router.url !== '/' && this.router.url !== '/login') {
            this.authenticationService.getUserProfile().subscribe(applicationUser => {
                if (applicationUser.lockoutEnabled) {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: 'User locked.',
                        life: 3000
                    });
                    this.router.navigateByUrl('/login');
                }

                const roles: string[] = applicationUser.roles || [];

                // Only dispatch loadPermissions() if user is NOT a student
                if (!roles.some(role => role.toLowerCase() === 'student')) {
                    this.store.dispatch(loadPermissions());
                }
            }, error => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'User locked.',
                    life: 3000
                });
                this.router.navigateByUrl('/login');
            });
        }
        setInterval(() => {
            this.signalRService.startConnection();
        }, 60 * 1000);

        this.signalRService.addTransferNotificationMessageListener();

        //this.signalRService.addBroadcastNotificationMessageListener();
    }

    ngOnDestroy(): void {
        this.feedbackApiSub?.unsubscribe();
    }
}