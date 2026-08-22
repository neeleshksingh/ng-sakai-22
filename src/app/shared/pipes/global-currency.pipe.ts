import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'globalCurrency', standalone: true })
export class GlobalCurrencyPipe implements PipeTransform {
    transform(value: number, currency = 'INR'): string {
        return new Intl.NumberFormat('en-IN', { style: 'currency', currency }).format(value);
    }
}
