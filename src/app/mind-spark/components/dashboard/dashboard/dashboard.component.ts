import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DashboardKpi, ModuleDashboardComponent } from '@/app/global/components/module-dashboard/module-dashboard.component';

@Component({ selector: 'app-mind-spark-dashboard', standalone: true, imports: [ModuleDashboardComponent], templateUrl: './dashboard.component.html', styleUrl: './dashboard.component.scss', changeDetection: ChangeDetectionStrategy.OnPush })
export class MindSparkDashboardComponent {
    readonly kpis: DashboardKpi[] = [
        { label: 'Active Batches', value: '38', icon: 'pi pi-users', tone: 'blue' },
        { label: 'Faculty', value: '126', icon: 'pi pi-user', tone: 'orange' },
        { label: 'Classes Today', value: '72', icon: 'pi pi-calendar-clock', tone: 'green' },
        { label: 'Attendance', value: '91.4%', icon: 'pi pi-chart-line', tone: 'purple' }
    ];
}
