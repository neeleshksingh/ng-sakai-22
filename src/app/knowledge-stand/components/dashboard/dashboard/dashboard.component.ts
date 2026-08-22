import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DashboardKpi, ModuleDashboardComponent } from '@/app/global/components/module-dashboard/module-dashboard.component';

@Component({ selector: 'app-knowledge-stand-dashboard', standalone: true, imports: [ModuleDashboardComponent], templateUrl: './dashboard.component.html', styleUrl: './dashboard.component.scss', changeDetection: ChangeDetectionStrategy.OnPush })
export class KnowledgeStandDashboardComponent {
    readonly kpis: DashboardKpi[] = [
        { label: 'Examinations', value: '18 Active', icon: 'pi pi-file-edit', tone: 'blue' },
        { label: 'Hall Tickets', value: '1,420', icon: 'pi pi-ticket', tone: 'orange' },
        { label: 'Results Published', value: '32', icon: 'pi pi-check-circle', tone: 'green' },
        { label: 'Scrutiny Requests', value: '46', icon: 'pi pi-search', tone: 'purple' }
    ];
}
