import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DashboardKpi, ModuleDashboardComponent } from '@/app/global/components/module-dashboard/module-dashboard.component';

@Component({ selector: 'app-big-leads-dashboard', standalone: true, imports: [ModuleDashboardComponent], templateUrl: './dashboard.component.html', styleUrl: './dashboard.component.scss', changeDetection: ChangeDetectionStrategy.OnPush })
export class BigLeadsDashboardComponent {
    readonly kpis: DashboardKpi[] = [
        { label: 'New Applications', value: '248', icon: 'pi pi-user-plus', tone: 'blue' },
        { label: 'Verified Leads', value: '186', icon: 'pi pi-verified', tone: 'orange' },
        { label: 'Admissions', value: '94', icon: 'pi pi-id-card', tone: 'green' },
        { label: 'Pending Reviews', value: '27', icon: 'pi pi-clock', tone: 'purple' }
    ];
}
