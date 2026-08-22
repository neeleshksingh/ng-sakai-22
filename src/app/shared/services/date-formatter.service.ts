import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DateFormatterService {
    format(value: Date | string, locale = 'en-IN'): string {
        return new Intl.DateTimeFormat(locale, { day: '2-digit', month: 'short', year: 'numeric' }).format(new Date(value));
    }
}
