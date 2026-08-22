import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DashboardKpi, ModuleDashboardComponent } from '@/app/global/components/module-dashboard/module-dashboard.component';

@Component({ selector: 'app-time-clock-plus-dashboard', standalone: true, imports: [ModuleDashboardComponent], templateUrl: './dashboard.component.html', styleUrl: './dashboard.component.scss', changeDetection: ChangeDetectionStrategy.OnPush })
export class TimeClockPlusDashboardComponent {
    readonly kpis: DashboardKpi[] = [
        { label: 'Present Today', value: '438', icon: 'pi pi-user-plus', tone: 'blue' },
        { label: 'Leave Requests', value: '28', icon: 'pi pi-calendar-minus', tone: 'orange' },
        { label: 'Approved', value: '19', icon: 'pi pi-check-circle', tone: 'green' },
        { label: 'Timesheets Due', value: '41', icon: 'pi pi-clock', tone: 'purple' }
    ];
}
