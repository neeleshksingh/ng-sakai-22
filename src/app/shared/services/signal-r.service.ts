import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SignalRService {
    readonly connected = signal(false);

    connect(): void {
        this.connected.set(true);
    }

    disconnect(): void {
        this.connected.set(false);
    }
}
