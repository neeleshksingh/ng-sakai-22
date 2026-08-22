import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class OvsSearchStateService {
    readonly query = signal('');
}
