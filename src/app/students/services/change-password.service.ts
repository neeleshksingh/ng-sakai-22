import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ChangePassword } from "src/app/shared/models/students/change-password";
import { ChangePasswordResponse } from "src/app/shared/models/students/change-password-response";

import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class ChangePasswordService {
    constructor(private http: HttpClient) { }
    ChangePassword(changePassword:ChangePassword) {
        return this.http.post<ChangePasswordResponse>(environment.identityServerUrl + '/Account/ChangePassword',changePassword);     
    }
}