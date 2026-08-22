import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DashboardKpi, ModuleDashboardComponent } from '@/app/global/components/module-dashboard/module-dashboard.component';

@Component({ selector: 'app-developers-dashboard', standalone: true, imports: [ModuleDashboardComponent], templateUrl: './dashboard.component.html', styleUrl: './dashboard.component.scss', changeDetection: ChangeDetectionStrategy.OnPush })
export class DevelopersDashboardComponent {
    readonly kpis: DashboardKpi[] = [
        { label: 'Applications', value: '14', icon: 'pi pi-box', tone: 'blue' },
        { label: 'Configurations', value: '86', icon: 'pi pi-cog', tone: 'orange' },
        { label: 'Healthy Services', value: '98.7%', icon: 'pi pi-heart-fill', tone: 'green' },
        { label: 'Open Incidents', value: '7', icon: 'pi pi-exclamation-triangle', tone: 'purple' }
    ];
}
