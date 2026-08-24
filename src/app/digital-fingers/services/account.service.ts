import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApplicationUser } from 'src/app/shared/models/digital-fingers/application-user';
import { LoggedInUser } from 'src/app/shared/models/digital-fingers/LoggedInUser';
import { ResetPassword } from 'src/app/shared/models/digital-fingers/reset-password';
import { UpdateUser } from 'src/app/shared/models/digital-fingers/update-user';
import { UserSignUp } from 'src/app/shared/models/digital-fingers/user-signup';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) { }


  userSignUp(userSignUp: UserSignUp, formFile: FormData) {
    return this.http.post<UserSignUp>(environment.identityServerUrl + '/Account/SignUp', userSignUp);
  }

  isUserNameExistsByUserName(userName: string) {
    return this.http.get<any>(environment.identityServerUrl + '/Account/IsUserNameExistsByUserName/' + userName);
  }

  getLoggedInUserDetails() {
    return this.http.get<LoggedInUser>(environment.identityServerUrl + '/Account/GetApplicationUser');
  }

  getApplicationUserByUserName(username: string) {
    return this.http.get<ApplicationUser>(environment.identityServerUrl + '/Account/GetApplicationUserByUserName/' + username)
  }

  addUserRolesByUserName(role: any, username: string) {
    return this.http.post(environment.identityServerUrl + '/Account/AddUserRolesByUserName/' + username, role)
  }

  deleteUserRolesByUserName(role: any, username: string) {
    return this.http.post(environment.identityServerUrl + '/Account/DeleteUserRolesByUserName/' + username, role)
  }
  getApplicationUserList() {
    return this.http.get(environment.identityServerUrl + '/Account/GetApplicationUserList')
  }
  updateApplicationUserProfile(payload:UpdateUser){
    return this.http.post(environment.identityServerUrl + '/Account/UpdateApplicationUserProfile', payload);
  }
  LockUserByUserName(username: string) {
    return this.http.post(environment.identityServerUrl + '/Account/LockUserByUserName/' + username, {})
  }
  UnLockUserByUserName(username: string) {
    return this.http.post(environment.identityServerUrl + '/Account/UnlockUserByUserName/' + username, {})
  }
  ResetPassword(resetPassword: ResetPassword) {
    return this.http.post<any>(environment.identityServerUrl + '/Account/ResetPassword', resetPassword);
  }
  ImportUsers(formData : any) {
    return this.http.post(environment.identityServerUrl + '/Account/ImportUsers', formData)
  }
}