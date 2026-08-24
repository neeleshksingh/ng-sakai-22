import { HttpErrorResponse, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, filter, switchMap, take, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginResponse } from '../models/idp/login';
import { AuthenticationService } from 'src/app/idp/services/authentication-service.service';

let isRefreshing = false;
const refreshTokenSubject = new BehaviorSubject<string | null>(null);

const REFRESH_TOKEN_URL = '/Account/RefreshToken';
const REFRESH_THRESHOLD_MS = 5 * 60 * 1000; // 5 minutes

function isTokenExpiringSoon(loginResponse: LoginResponse): boolean {
  const expiresIn = loginResponse?.tokenInfo?.expiresIn;
  if (!expiresIn) return false;
  const remainingMs = new Date(expiresIn).getTime() - Date.now();
  return remainingMs <= REFRESH_THRESHOLD_MS;
}

function addCommonHeaders(request: HttpRequest<unknown>): HttpRequest<unknown> {
  return request.clone({
    setHeaders: {
      'x-api-key': environment.xAPIKey,
      'x-partner-key': environment.partner.partnerCode,
      'UserTimeZone': 'India Standard Time',
      'latitude': '',
      'longitude': ''
    }
  });
}

export const authInterceptor: HttpInterceptorFn = (request, next) => {
  const router = inject(Router);
  const authService = inject(AuthenticationService);

  // For the refresh token call itself: add common headers only, no auth/refresh logic
  if (request.url.includes(REFRESH_TOKEN_URL)) {
    return next(addCommonHeaders(request));
  }

  // Student onboarding is a public, phone/email-verified flow with no IDP login/JWT of its own.
  // Skip the currentUser/refresh-token logic so a stale/expiring admin session doesn't log the student out.
  if (router.url.includes('/admissions/student-onboarding')) {
    return next(addCommonHeaders(request));
  }

  const loginResponseStr = localStorage.getItem('currentUser') ?? '';
  let loginResponse: LoginResponse | null = null;

  if (loginResponseStr) {
    loginResponse = JSON.parse(loginResponseStr) as LoginResponse;
  }

  // Always attach common API headers
  request = addCommonHeaders(request);

  if (!loginResponse) {
    return next(request);
  }

  // Proactively refresh if the token expires within the next 5 minutes (or is already expired)
  if (isTokenExpiringSoon(loginResponse)) {
    return handleTokenRefresh(request, next, router, authService, loginResponse);
  }

  // Token is still valid — attach Authorization header and proceed
  request = request.clone({
    setHeaders: { Authorization: 'Bearer ' + loginResponse.tokenInfo.accessToken }
  });

  return next(request).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        // Re-read from storage in case a concurrent request already refreshed it
        const freshStr = localStorage.getItem('currentUser');
        const freshResponse = freshStr ? JSON.parse(freshStr) as LoginResponse : loginResponse!;
        return handleTokenRefresh(request, next, router, authService, freshResponse);
      }
      return throwError(() => error);
    })
  );
};

function handleTokenRefresh(
  request: HttpRequest<unknown>,
  next: HttpHandlerFn,
  router: Router,
  authService: AuthenticationService,
  loginResponse: LoginResponse
) {
  if (!isRefreshing) {
    isRefreshing = true;
    refreshTokenSubject.next(null);

    const { accessToken, refreshToken } = loginResponse.tokenInfo;

    return authService.refreshToken(accessToken!, refreshToken!).pipe(
      switchMap((newResponse: LoginResponse) => {
        isRefreshing = false;

        // Merge the refreshed tokenInfo into the stored user and save back
        const storedUser: LoginResponse = JSON.parse(localStorage.getItem('currentUser')!);
        storedUser.tokenInfo = newResponse.tokenInfo;
        localStorage.setItem('currentUser', JSON.stringify(storedUser));

        refreshTokenSubject.next(newResponse.tokenInfo.accessToken!);

        return next(request.clone({
          setHeaders: { Authorization: 'Bearer ' + newResponse.tokenInfo.accessToken }
        }));
      }),
      catchError((err) => {
        isRefreshing = false;
        localStorage.removeItem('currentUser');
        router.navigate(['/login']);
        return throwError(() => err);
      })
    );
  }

  return refreshTokenSubject.pipe(
    filter(token => token !== null),
    take(1),
    switchMap(token =>
      next(request.clone({
        setHeaders: { Authorization: 'Bearer ' + token }
      }))
    )
  );
}
