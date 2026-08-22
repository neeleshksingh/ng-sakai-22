import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UtilityService {
    titleFromSlug(value: string): string {
        return value
            .split('-')
            .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
            .join(' ');
    }
}
