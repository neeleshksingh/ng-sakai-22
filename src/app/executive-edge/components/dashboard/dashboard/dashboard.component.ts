import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DashboardKpi, ModuleDashboardComponent } from '@/app/global/components/module-dashboard/module-dashboard.component';

@Component({ selector: 'app-executive-edge-dashboard', standalone: true, imports: [ModuleDashboardComponent], templateUrl: './dashboard.component.html', styleUrl: './dashboard.component.scss', changeDetection: ChangeDetectionStrategy.OnPush })
export class ExecutiveEdgeDashboardComponent {
    readonly kpis: DashboardKpi[] = [
        { label: 'Active Surveys', value: '8', icon: 'pi pi-megaphone', tone: 'blue' },
        { label: 'Responses', value: '2,814', icon: 'pi pi-comments', tone: 'orange' },
        { label: 'Completion Rate', value: '87%', icon: 'pi pi-chart-line', tone: 'green' },
        { label: 'Pending Feedback', value: '62', icon: 'pi pi-inbox', tone: 'purple' }
    ];
}
