import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class IpService {
    getIpAddress(): Observable<string> {
        return of('192.168.1.1');
    }
}
