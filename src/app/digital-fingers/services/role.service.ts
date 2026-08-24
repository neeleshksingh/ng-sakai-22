import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Role } from 'src/app/shared/models/digital-fingers/role';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class  RoleService {

  constructor(private http: HttpClient) { }

  getAllRoles() {
    return this.http.get<Role[]>(environment.identityServerUrl + '/Role/GetRoles');
  }
  addRoles(payload: any) {
    return this.http.post(environment.identityServerUrl+ '/Role/CreateRoles', payload);
  }
  updateRoles(payload:Role){
    return this.http.post(environment.identityServerUrl+'/Role/UpdateRole',payload)
  }
  deleteRoles(payload:Role) {
    return this.http.post(environment.identityServerUrl+'/Role/DeleteRole', payload)
  }

  getUserDetails(username:string){
    return this.http.get(environment.identityServerUrl+'/Account/GetApplicationUserByUserName/'+username)
  }
  addUserRolesByUserName(role:any,username:string){
    return this.http.post(environment.identityServerUrl+'/Account/AddUserRolesByUserName/'+username, role)
  }   
  deleteUserRolesByUserName(role:any,username:string){
    return this.http.post(environment.identityServerUrl+'/Account/DeleteUserRolesByUserName/'+username, role)
  }

  getApplicationUserList(payload: any){
    return this.http.post(environment.identityServerUrl+'/Account/GetApplicationUserByRoleNames', payload)
  } 

  LockUserByUserName(username:string){
     return this.http.post(environment.identityServerUrl+'/Account/LockUserByUserName/'+username,{})
  }
  UnLockUserByUserName(username:string){
    return this.http.post(environment.identityServerUrl+'/Account/UnlockUserByUserName/'+username,{})
  }
  GetApplicationUsersByTerms(terms:string){
    return this.http.get(environment.identityServerUrl+'/Account/GetApplicationUsersByTerms/' + terms)
  }
}
