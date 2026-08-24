import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SignUp } from 'src/app/shared/models/idp/signUp';
import { ApplicationUser } from 'src/app/shared/models/idp/userAccount';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AccountService {
    constructor(private http: HttpClient) {

    }
    getUserLoginList() {
        return this.http.get<ApplicationUser[]>(environment.identityServerUrl + '/Account/GetApplicationUserList');
    }

    getUserLoginLists() {
        return this.http.get<ApplicationUser[]>(environment.identityServerUrl + '/Account/GetApplicationUserList');
    }
    getUserProfileByUserName(userName: string) {
        return this.http.get<ApplicationUser>(environment.identityServerUrl + '/Account/GetApplicationUserByUserName/' + userName);
    }
    getRoles() {
        return this.http.get<string[]>(environment.identityServerUrl + '/Account/GetRoles');
    }

    signUp(signUp: SignUp) {
        return this.http.post<SignUp>(environment.identityServerUrl + '/Account/SignUp', signUp);
    }
}