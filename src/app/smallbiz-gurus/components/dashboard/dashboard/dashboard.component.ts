import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DashboardKpi, ModuleDashboardComponent } from '@/app/global/components/module-dashboard/module-dashboard.component';

@Component({ selector: 'app-smallbiz-gurus-dashboard', standalone: true, imports: [ModuleDashboardComponent], templateUrl: './dashboard.component.html', styleUrl: './dashboard.component.scss', changeDetection: ChangeDetectionStrategy.OnPush })
export class SmallbizGurusDashboardComponent {
    readonly kpis: DashboardKpi[] = [
        { label: 'Employees', value: '486', icon: 'pi pi-users', tone: 'blue' },
        { label: 'Open Positions', value: '18', icon: 'pi pi-briefcase', tone: 'orange' },
        { label: 'Payroll Ready', value: '94%', icon: 'pi pi-money-bill', tone: 'green' },
        { label: 'Pending Reviews', value: '23', icon: 'pi pi-star', tone: 'purple' }
    ];
}
