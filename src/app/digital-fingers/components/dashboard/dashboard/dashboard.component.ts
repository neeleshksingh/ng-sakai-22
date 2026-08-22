import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DashboardKpi, ModuleDashboardComponent } from '@/app/global/components/module-dashboard/module-dashboard.component';

@Component({ selector: 'app-digital-fingers-dashboard', standalone: true, imports: [ModuleDashboardComponent], templateUrl: './dashboard.component.html', styleUrl: './dashboard.component.scss', changeDetection: ChangeDetectionStrategy.OnPush })
export class DigitalFingersDashboardComponent {
    readonly kpis: DashboardKpi[] = [
        { label: 'Active Users', value: '3,248', icon: 'pi pi-users', tone: 'blue' },
        { label: 'Roles', value: '26', icon: 'pi pi-shield', tone: 'orange' },
        { label: 'Permissions', value: '184', icon: 'pi pi-key', tone: 'green' },
        { label: 'Locked Accounts', value: '12', icon: 'pi pi-lock', tone: 'purple' }
    ];
}
