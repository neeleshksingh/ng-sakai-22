import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DashboardKpi, ModuleDashboardComponent } from '@/app/global/components/module-dashboard/module-dashboard.component';

@Component({ selector: 'app-virtual-learn-dashboard', standalone: true, imports: [ModuleDashboardComponent], templateUrl: './dashboard.component.html', styleUrl: './dashboard.component.scss', changeDetection: ChangeDetectionStrategy.OnPush })
export class VirtualLearnDashboardComponent {
    readonly kpis: DashboardKpi[] = [
        { label: 'Book Titles', value: '28,420', icon: 'pi pi-book', tone: 'blue' },
        { label: 'Members', value: '4,862', icon: 'pi pi-users', tone: 'orange' },
        { label: 'Issued Today', value: '146', icon: 'pi pi-arrow-right-arrow-left', tone: 'green' },
        { label: 'Overdue', value: '38', icon: 'pi pi-exclamation-circle', tone: 'purple' }
    ];
}
