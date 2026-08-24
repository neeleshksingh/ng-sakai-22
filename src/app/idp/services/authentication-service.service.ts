import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AppVersion } from 'src/app/shared/models/idp/app-version';
import { environment } from 'src/environments/environment';
import { LoginRequest, LoginResponse, RequestOTP, UpdatePassword, UserLogin, ValidateOTP } from '../../shared/models/idp/login';
import { ApplicationUser } from '../../shared/models/idp/userAccount';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  challengePasswordResponse: any;

  private currentUserSubject: BehaviorSubject<LoginResponse | null>;
  public currentUser: Observable<LoginResponse | null>;
  loginResponse: LoginResponse;

  constructor(private httpClient: HttpClient) {
    this.loginResponse = new LoginResponse();

    var data = localStorage.getItem('currentUser');
    if (data) {
      this.currentUserSubject = new BehaviorSubject<LoginResponse | null>(JSON.parse(data));
    }
    else {
      this.currentUserSubject = new BehaviorSubject<LoginResponse | null>(new LoginResponse());
    }

    this.currentUser = this.currentUserSubject.asObservable();

  }

  public get currentUserValue(): LoginResponse {
    return this.currentUserSubject.value!;
  }

  getUserProfile(): Observable<ApplicationUser> {
    return this.httpClient.get<ApplicationUser>(environment.identityServerUrl + '/Account/GetApplicationUser');
  }

  logout() {
    var lastLoggedInUserStr = localStorage.getItem("lastLoggedInUser");
    var lastLoggedInUser = lastLoggedInUserStr ? JSON.parse(lastLoggedInUserStr) : null;

    // localStorage.clear();
    // sessionStorage.clear();
    localStorage.removeItem('currentUser');
    localStorage.setItem('lastLoggedInUser', JSON.stringify({ displayImageUrl: lastLoggedInUser.displayImageUrl, userName: lastLoggedInUser.userName, }));
    this.currentUserSubject.next(null);
  }

  signIn(loginRequest: LoginRequest) {
    // const httpOptions = {
    //     headers: new HttpHeaders({
    //         'TimezoneOffset': String(new Date().getTimezoneOffset())
    //     })
    // };
    return this.httpClient.post<LoginResponse>(environment.identityServerUrl + '/Account/SignIn', loginRequest);
  }

  sendOTPToUserPhoneNumber(payload: RequestOTP) {
    return this.httpClient.post(environment.identityServerUrl + '/Account/SendOTPToUserPhoneNumber', payload);
  }

  LoginWithOTP(payload: ValidateOTP) {
    return this.httpClient.post<LoginResponse>(environment.identityServerUrl + '/Account/LoginWithOTP', payload);
  }

  ///Account/SendOtpForgotPasswordOtpRequest
  SendOtpForgotPasswordOtpRequest(payload: UserLogin) {
    return this.httpClient.post(environment.identityServerUrl + '/Account/SendOtpForgotPasswordOtpRequest', payload);
  }
  UpdatePasswordByForgotPasswordUpdateRequest(payload: UpdatePassword) {
    return this.httpClient.post(environment.identityServerUrl + '/Account/UpdatePasswordByForgotPasswordUpdateRequest', payload);
  }

  refreshToken(accessToken: string, refreshToken: string): Observable<LoginResponse> {
    return this.httpClient.post<LoginResponse>(
      environment.identityServerUrl + '/Account/RefreshToken',
      { accessToken, refreshToken }
    );
  }

  getPosition(): Observable<GeolocationPosition> {
    return new Observable<GeolocationPosition>(observer => {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          position => {
            observer.next(position);
            observer.complete();
          },
          error => observer.error(error)
        );
      } else {
        observer.error('Geolocation is not supported by this browser.');
      }
    });
  }

  getCurrentVersion(): Observable<AppVersion> {
    return this.httpClient.get<AppVersion>(environment.identityServerUrl + '/AppVersion/GetCurrentVersion');
  }
}
