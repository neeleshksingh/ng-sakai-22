import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePickerModule } from 'primeng/datepicker';

@Component({
    selector: 'app-leave-date-range-picker',
    standalone: true,
    imports: [FormsModule, DatePickerModule],
    templateUrl: './leave-date-range-picker.component.html',
    styleUrl: './leave-date-range-picker.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LeaveDateRangePickerComponent {
    readonly label = input('Leave period');
    readonly rangeChange = output<Date[] | null>();
    range: Date[] | null = null;
}
