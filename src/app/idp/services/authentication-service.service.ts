import { Injectable, signal } from '@angular/core';
import { Observable, of } from 'rxjs';
import { LoginResponse } from '@/app/shared/models/idp/login';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    readonly authenticated = signal(true);

    login(userName: string): Observable<LoginResponse> {
        this.authenticated.set(true);
        return of({ token: 'demo-token', userName, roles: ['Admin', 'Faculty'] });
    }

    logout(): void {
        this.authenticated.set(false);
    }
}
