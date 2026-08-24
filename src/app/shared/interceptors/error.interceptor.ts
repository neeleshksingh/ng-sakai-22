import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { MessageService } from 'primeng/api';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { StudentProfileActions } from 'src/app/store/actions/student-profile.actions';
import { StudentProgramActions } from 'src/app/store/actions/student-program.actions';

export const errorInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
    const router = inject(Router);
    const messageService = inject(MessageService);
    const injector = inject(Injector);

    return next(req).pipe(
        catchError((error: HttpErrorResponse) => {

            // Handle CORS errors - specific detection for your case
            if (error.status === 0 &&
                (error.statusText === 'Unknown Error' || error.statusText === '' || !error.statusText) &&
                error.url &&
                (!error.error || Object.keys(error.error).length === 0)) {
                const corsErrorMessage = "Cross-origin request blocked. Please ensure you're accessing the application from an authorized domain or contact support or try again later.";

                const corsError: any = new Error(corsErrorMessage);
                corsError.error = { message: corsErrorMessage };
                corsError.status = 0;
                corsError.statusText = 'CORS Error';

                return throwError(() => corsError);
            }

            // Handle network connectivity issues
            if (error.status === 0 && !navigator.onLine) {
                const networkErrorMessage = "No internet connection. Please check your network and try again.";

                const networkError: any = new Error(networkErrorMessage);
                networkError.error = { message: networkErrorMessage };
                networkError.status = 0;
                networkError.statusText = 'Network Offline';

                return throwError(() => networkError);
            }
            // Handle other network errors (server unreachable)
            if (error.status === 0) {
                const connectionErrorMessage = "Unable to connect to server. Please try again later.";

                const connectionError: any = new Error(connectionErrorMessage);
                connectionError.error = { message: connectionErrorMessage };
                connectionError.status = 0;
                connectionError.statusText = 'Connection Failed';

                return throwError(() => connectionError);
            }
            if (error.status === 401) {
                if (req.url.includes('/StudentOnboarding')) {
                    clearActiveOnboardingSession(router);
                    router.navigate(['/admissions/student-onboarding/login']);
                    return throwError(() => error);
                }

                // Clear student profile state on unauthorized access
                try {
                    const store = injector.get(Store);
                    store.dispatch(StudentProfileActions.clearStudentProfile());
                    store.dispatch(StudentProgramActions.clearStudentPrograms());
                } catch { }

                messageService.add({
                    severity: 'error',
                    summary: 'Unauthorised Access',
                    detail: error.error.message,
                    life: 5000
                });
                // Return error without propagating further
                return throwError(() => error);
            }
            else if (error.status === 403) {
                // Show toast message for forbidden access instead of navigation
                messageService.add({
                    severity: 'error',
                    summary: 'Access Denied',
                    detail: error.error.message,
                    life: 5000
                });
                // Return error without propagating further
                return throwError(() => error);
            }
            var errorMessage = error.error.message || error.statusText;
            const customError: any = new Error(errorMessage);
            customError.error = { message: errorMessage };
            customError.status = error.status;
            customError.statusText = error.statusText;
            return throwError(() => customError);
        })
    );
};

function clearActiveOnboardingSession(router: Router): void {
    const routeMatch = router.url.match(
        /student-onboarding-overview\/[^/]+\/([^/]+)\/([^/]+)\/([^/?]+)/
    );

    if (!routeMatch) {
        return;
    }

    const [, provisionalNumber, phoneNumber, emailAddress] = routeMatch;
    localStorage.removeItem(`${decodeURIComponent(provisionalNumber)}_${decodeURIComponent(phoneNumber)}_${decodeURIComponent(emailAddress)}`);
}