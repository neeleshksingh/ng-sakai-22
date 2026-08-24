import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ModuleTrackerService } from './module-tracker.service';

@Injectable({
    providedIn: 'root'
})
export class LoadingService {
    private isLoading = new BehaviorSubject<boolean>(false);
    isLoading$ = this.isLoading.asObservable();

    constructor(private moduleTracker: ModuleTrackerService) { }

    shouldShowLoader(modulePath: string): boolean {
        return !this.moduleTracker.isModuleLoaded(modulePath);
    }

    show() {
        this.isLoading.next(true);
    }

    hide(modulePath?: string) {
        if (modulePath) {
            this.moduleTracker.markModuleAsLoaded(modulePath);
        }
        this.isLoading.next(false);
    }
}