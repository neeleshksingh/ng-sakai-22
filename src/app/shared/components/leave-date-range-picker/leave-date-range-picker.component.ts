import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-leave-date-range-picker',
  standalone: true,
  imports: [CommonModule, FormsModule, CalendarModule, TooltipModule],
  templateUrl: './leave-date-range-picker.component.html',
  styleUrl: './leave-date-range-picker.component.scss'
})
export class LeaveDateRangePickerComponent {
  @Input() rangeDates: Date[] | undefined;
  @Input() minDate: Date | undefined;
  @Input() maxDate: Date | undefined;
  @Input() holidayMap: Map<string, string> = new Map();
  @Input() disabled: boolean = false;

  @Output() rangeDatesChange = new EventEmitter<Date[] | undefined>();
  @Output() dateSelected = new EventEmitter<any>();

  onRangeChange(dates: Date[] | undefined) {
    if (this.disabled) return;
    this.rangeDates = dates;
    this.rangeDatesChange.emit(dates);
  }

  onDateSelect(event: any) {
    if (this.disabled) return;
    this.dateSelected.emit(event);
  }

  getDateKey(date: Date): string {
    return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
  }

  convertPrimeNGDate(dateObj: any): Date {
    if (dateObj instanceof Date) {
      return dateObj;
    }
    return new Date(dateObj.year, dateObj.month, dateObj.day);
  }

  isSunday(date: Date): boolean {
    return date.getDay() === 0;
  }

  isSecondOrFourthSaturday(date: Date): boolean {
    if (date.getDay() !== 6) {
      return false;
    }

    const dayOfMonth = date.getDate();
    const saturdayNumber = Math.ceil(dayOfMonth / 7);
    return saturdayNumber === 2 || saturdayNumber === 4;
  }

  isAcademicHoliday(date: Date): boolean {
    const dateKey = this.getDateKey(date);
    return this.holidayMap.has(dateKey);
  }

  getHolidayTooltip(dateObj: any): string {
    const date = this.convertPrimeNGDate(dateObj);
    const dateKey = this.getDateKey(date);

    if (this.holidayMap.has(dateKey)) {
      return this.holidayMap.get(dateKey) || 'Holiday';
    }

    if (this.isSunday(date)) {
      return 'Sunday';
    }

    if (this.isSecondOrFourthSaturday(date)) {
      return 'Weekend (2nd/4th Saturday)';
    }

    return '';
  }

  getDateClass(dateObj: any): any {
    const date = this.convertPrimeNGDate(dateObj);

    return {
      'academic-holiday': this.isAcademicHoliday(date),
      'sunday-holiday': this.isSunday(date),
      'saturday-holiday': this.isSecondOrFourthSaturday(date)
    };
  }

  getDateStyle(dateObj: any): any {
    const date = this.convertPrimeNGDate(dateObj);

    if (this.isAcademicHoliday(date)) {
      return {
        'background': '#fff0f0',
        'color': '#c03636',
        'font-weight': '600',
        'border': '1px solid #f8a5a5',
        'border-radius': '6px',
        'display': 'inline-flex',
        'align-items': 'center',
        'justify-content': 'center',
        'width': '2.5rem',
        'height': '2.5rem'
      };
    }

    if (this.isSunday(date)) {
      return {
        'background': '#ffe8e8',
        'color': '#b91c1c',
        'font-weight': '600',
        'border': '1px solid #fca5a5',
        'border-radius': '6px',
        'display': 'inline-flex',
        'align-items': 'center',
        'justify-content': 'center',
        'width': '2.5rem',
        'height': '2.5rem'
      };
    }

    if (this.isSecondOrFourthSaturday(date)) {
      return {
        'background': '#fef3c7',
        'color': '#b45309',
        'font-weight': '600',
        'border': '1px solid #fcd34d',
        'border-radius': '6px',
        'display': 'inline-flex',
        'align-items': 'center',
        'justify-content': 'center',
        'width': '2.5rem',
        'height': '2.5rem'
      };
    }

    return {};
  }
}
