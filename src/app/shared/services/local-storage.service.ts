import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LocalStorageService {
    get<T>(key: string): T | null {
        if (typeof window === 'undefined') return null;
        const value = window.localStorage.getItem(key);
        if (!value) return null;
        try {
            return JSON.parse(value) as T;
        } catch {
            return null;
        }
    }

    set<T>(key: string, value: T): void {
        if (typeof window !== 'undefined') window.localStorage.setItem(key, JSON.stringify(value));
    }

    remove(key: string): void {
        if (typeof window !== 'undefined') window.localStorage.removeItem(key);
    }
}
