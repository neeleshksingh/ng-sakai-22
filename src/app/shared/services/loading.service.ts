import { Injectable, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoadingService {
    private activeRequests = 0;
    private readonly loadingSubject = new BehaviorSubject(false);

    readonly isLoading$ = this.loadingSubject.asObservable();
    readonly loading = signal(false);

    show(): void {
        this.activeRequests += 1;
        this.setLoading(true);
    }

    hide(): void {
        this.activeRequests = Math.max(0, this.activeRequests - 1);
        this.setLoading(this.activeRequests > 0);
    }

    reset(): void {
        this.activeRequests = 0;
        this.setLoading(false);
    }

    private setLoading(value: boolean): void {
        this.loading.set(value);
        this.loadingSubject.next(value);
    }
}
