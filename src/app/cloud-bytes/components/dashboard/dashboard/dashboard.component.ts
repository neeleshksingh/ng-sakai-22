import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DashboardKpi, ModuleDashboardComponent } from '@/app/global/components/module-dashboard/module-dashboard.component';

@Component({ selector: 'app-cloud-bytes-dashboard', standalone: true, imports: [ModuleDashboardComponent], templateUrl: './dashboard.component.html', styleUrl: './dashboard.component.scss', changeDetection: ChangeDetectionStrategy.OnPush })
export class CloudBytesDashboardComponent {
    readonly kpis: DashboardKpi[] = [
        { label: 'Partner Code', value: 'NCORE-2024', icon: 'pi pi-users', tone: 'blue' },
        { label: 'Departments', value: '12 Departments', icon: 'pi pi-map', tone: 'orange' },
        { label: 'Programs', value: '45 Programs', icon: 'pi pi-book', tone: 'green' },
        { label: 'Subjects', value: '350 Subjects', icon: 'pi pi-comments', tone: 'purple' }
    ];
}
