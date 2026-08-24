import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ActiveApplicationUser } from 'src/app/shared/models/finance-Pro/active-application-user';
import { UserAccount } from 'src/app/shared/models/finance-Pro/user-account';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

    constructor(private http: HttpClient) { }
    
    getUserProfileByUserName(userName: string): Observable<UserAccount> {
    return this.http.get<UserAccount>(`${environment.identityServerUrl}/Account/GetApplicationUserByUserName/${userName}`);
    }

    getActiveApplicationUsers(): Observable<ActiveApplicationUser[]> {
    return this.http.get<ActiveApplicationUser[]>(`${environment.identityServerUrl}/Account/GetActiveApplicationUsers/`);
    }
}
