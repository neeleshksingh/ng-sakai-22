import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DashboardKpi, ModuleDashboardComponent } from '@/app/global/components/module-dashboard/module-dashboard.component';

@Component({ selector: 'app-student-dashboard', standalone: true, imports: [ModuleDashboardComponent], templateUrl: './dashboard.component.html', styleUrl: './dashboard.component.scss', changeDetection: ChangeDetectionStrategy.OnPush })
export class StudentDashboardComponent {
    readonly kpis: DashboardKpi[] = [
        { label: 'Attendance', value: '92.6%', icon: 'pi pi-chart-line', tone: 'blue' },
        { label: 'Current Semester', value: 'Semester VI', icon: 'pi pi-book', tone: 'orange' },
        { label: 'Fees Due', value: '₹12,500', icon: 'pi pi-wallet', tone: 'green' },
        { label: 'Open Requests', value: '3', icon: 'pi pi-ticket', tone: 'purple' }
    ];
}
