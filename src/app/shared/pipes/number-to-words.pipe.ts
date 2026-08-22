import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'numberToWords', standalone: true })
export class NumberToWordsPipe implements PipeTransform {
    transform(value: number): string {
        return new Intl.NumberFormat('en-IN').format(value);
    }
}
