import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';

@Component({
    selector: 'app-employee-calender',
    standalone: true,
    imports: [FullCalendarModule],
    templateUrl: './employee-calender.component.html',
    styleUrl: './employee-calender.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeeCalenderComponent {
    readonly mode = input<'all' | 'leave' | 'events'>('all');

    readonly calendarOptions: CalendarOptions = {
        plugins: [dayGridPlugin],
        initialView: 'dayGridMonth',
        initialDate: '2026-08-22',
        height: 360,
        headerToolbar: { left: 'prev,next', center: 'title', right: 'today' },
        events: [
            { title: 'Faculty meeting', start: '2026-08-22', color: '#6366f1' },
            { title: 'Marks review', start: '2026-08-24', color: '#f59e0b' },
            { title: 'Department workshop', start: '2026-08-28', color: '#22c55e' }
        ]
    };
}
