import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanDeactivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/idp/services/authentication-service.service';
import { LoginResponse } from '../models/idp/login';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild, CanDeactivate<unknown>, CanLoad {
  constructor(private router: Router, private authenticationService: AuthenticationService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const currentUserJsonString = localStorage.getItem('currentUser');
    const currentUrl = state.url;

    if (currentUserJsonString) {
      const loginResponse: LoginResponse = JSON.parse(currentUserJsonString);
      const currentDateTime = new Date();

      if (
        loginResponse &&
        loginResponse.applicationUser?.userName &&
        new Date(loginResponse.tokenInfo.expiresIn ?? 0) > currentDateTime
      ) {
        return true;
      }
    }

    // Redirect to login page without preserving returnUrl for protected routes
    localStorage.removeItem('currentUser');
    localStorage.removeItem('userMenuPreferences');
    localStorage.removeItem('employeeDetails');

    return this.router.createUrlTree(['/'], { queryParams: { returnUrl: state.url } });
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.canActivate(childRoute, state);
  }

  canDeactivate(
    component: unknown,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const currentUserJsonString = localStorage.getItem('currentUser');
    if (currentUserJsonString) {
      const loginResponse: LoginResponse = JSON.parse(currentUserJsonString);
      const currentDateTime = new Date();
      if (
        loginResponse &&
        loginResponse.applicationUser?.userName &&
        new Date(loginResponse.tokenInfo.expiresIn ?? 0) > currentDateTime
      ) {
        return true;
      }
    }

    localStorage.removeItem('currentUser');
    localStorage.removeItem('userMenuPreferences');
    localStorage.removeItem('employeeDetails');

    return this.router.createUrlTree(['/login']);
  }
}