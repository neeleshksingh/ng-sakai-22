import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ModuleTrackerService {
    readonly activeModule = signal('Dashboard');

    setActiveModule(moduleName: string): void {
        this.activeModule.set(moduleName);
    }
}
