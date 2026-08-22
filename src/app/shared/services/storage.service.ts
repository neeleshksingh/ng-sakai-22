import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class StorageService {
    get<T>(key: string): T | null {
        try {
            return JSON.parse(localStorage.getItem(key) ?? 'null') as T | null;
        } catch {
            return null;
        }
    }

    set(key: string, value: unknown): void {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch {
            // Storage is optional in restricted browser contexts.
        }
    }
}
