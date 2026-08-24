import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'globalCurrency',
    pure: true,
    standalone: true
})
export class GlobalCurrencyPipe implements PipeTransform {

    transform(
        value: number | string,
        currencyCode: string = 'INR',
        digits: string = '1.2-2'
    ): string {

        if (value === null || value === undefined || value === '') {
            return this.format(0, currencyCode);
        }

        const num = typeof value === 'string' ? parseFloat(value) : value;

        return this.format(num, currencyCode);
    }

    private format(value: number, currencyCode: string): string {
        const currencyMap: any = {
            INR: { symbol: '₹', locale: 'en-IN' },
            USD: { symbol: '$', locale: 'en-US' },
            EUR: { symbol: '€', locale: 'de-DE' },
            GBP: { symbol: '£', locale: 'en-GB' },
            JPY: { symbol: '¥', locale: 'ja-JP', noDecimal: true },
            AED: { symbol: 'د.إ', locale: 'en-AE' },
            SGD: { symbol: '$', locale: 'en-SG' }
        };

        const config = currencyMap[currencyCode] || currencyMap['INR'];

        return `${config.symbol} ${value.toLocaleString(config.locale, {
            minimumFractionDigits: config.noDecimal ? 0 : 2,
            maximumFractionDigits: config.noDecimal ? 0 : 2
        })}`;
    }
}