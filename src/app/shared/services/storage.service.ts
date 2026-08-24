import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class StorageService {
    private readonly maxStorageCapacity = 5 * 1024 * 1024;

    constructor() { }

    getStorageUsage(): number {
        return Object.keys(localStorage).length;
    }
    getTotalStorageSize(): number {
        let totalSize = 0;
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key !== null) {
                const value = localStorage.getItem(key) || '';
                totalSize += key.length + value.length * 2;
            }
        }
        return totalSize;
    }

    getRemainingCapacity(): number {
        const totalSize = this.getTotalStorageSize();
        return this.maxStorageCapacity - totalSize;
    }
}