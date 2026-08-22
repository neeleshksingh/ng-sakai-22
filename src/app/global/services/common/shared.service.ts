import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SharedService {
    private readonly loading = new BehaviorSubject(false);
    readonly isLoading$ = this.loading.asObservable();

    setLoading(value: boolean): void {
        this.loading.next(value);
    }
}
