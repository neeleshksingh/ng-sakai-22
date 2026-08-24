import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ModuleTrackerService {
    private loadedModules = new Set<string>();

    markModuleAsLoaded(modulePath: string): void {
        this.loadedModules.add(modulePath);
    }

    isModuleLoaded(modulePath: string): boolean {
        return this.loadedModules.has(modulePath);
    }
}