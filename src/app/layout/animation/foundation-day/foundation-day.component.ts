import { Component } from '@angular/core';

@Component({
  selector: 'app-foundation-day',
  standalone: true,
  imports: [],
  templateUrl: './foundation-day.component.html',
  styleUrl: './foundation-day.component.scss'
})
export class FoundationDayComponent {
  jharkhandFoundationDayDate: string = '15 November';
  jharkhandFoundationDayYear: string = '2000';
  anniversaryYear: number = 0;
  yearSuffix: string = '';

  ngOnInit(): void {
    this.calculateAnniversary();
  }

  calculateAnniversary(): void {
    const foundationYear = parseInt(this.jharkhandFoundationDayYear);
    const currentYear = new Date().getFullYear();
    this.anniversaryYear = currentYear - foundationYear;
    this.yearSuffix = this.getOrdinalSuffix(this.anniversaryYear);
  }

  getOrdinalSuffix(num: number): string {
    const lastDigit = num % 10;
    const lastTwoDigits = num % 100;

    // Special cases for 11th, 12th, 13th
    if (lastTwoDigits >= 11 && lastTwoDigits <= 13) {
      return 'th';
    }

    // Regular cases based on last digit
    switch (lastDigit) {
      case 1:
        return 'st';
      case 2:
        return 'nd';
      case 3:
        return 'rd';
      default:
        return 'th';
    }
  }
}
