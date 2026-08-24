import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberToWords',
  standalone: true
})
export class NumberToWordsPipe implements PipeTransform {

  private ones: string[] = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
  private teens: string[] = ['eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
  private tens: string[] = ['', 'ten', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
  private thousands: string[] = ['', 'thousand', 'lakh', 'crore'];

  transform(value: number): string {
    if (value === 0) return 'zero';
    if (!value || isNaN(value)) return '';

    return this.convertToWords(value);
  }

  private convertToWords(num: number): string {
    if (num === 0) {
      return 'zero';
    }

    let word = '';
    let counter = 0;

    const units = [10000000, 100000, 1000, 100]; // Crore, Lakh, Thousand, Hundred
    const unitNames = ['crore', 'lakh', 'thousand', 'hundred'];

    for (let i = 0; i < units.length; i++) {
      if (num >= units[i]) {
        const quotient = Math.floor(num / units[i]);
        word += this.convertHundreds(quotient) + ' ' + unitNames[i] + ' ';
        num %= units[i];
      }
    }

    if (num > 0) {
      word += this.convertHundreds(num) + ' ';
    }

    return word.trim();
  }

  private convertHundreds(num: number): string {
    let word = '';

    if (num > 99) {
      word += this.ones[Math.floor(num / 100)] + ' hundred ';
      num = num % 100;
    }

    if (num > 10 && num < 20) {
      word += this.teens[num - 11] + ' ';
    } else {
      word += this.tens[Math.floor(num / 10)] + ' ';
      if (num % 10 > 0) {
        word += this.ones[num % 10] + ' ';
      }
    }

    return word.trim();
  }
}
