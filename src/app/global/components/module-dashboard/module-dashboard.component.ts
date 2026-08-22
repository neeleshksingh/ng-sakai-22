import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { TimelineModule } from 'primeng/timeline';
import { BarGraphSkeletonComponent } from '../skeletons/bar-graph-skeleton/bar-graph-skeleton.component';
import { DashboardCardsSkeletonComponent } from '../skeletons/dashboard-cards-skeleton/dashboard-cards-skeleton.component';

export interface DashboardKpi {
    label: string;
    value: string;
    icon: string;
    tone: 'blue' | 'orange' | 'green' | 'purple';
}

@Component({
    selector: 'app-module-dashboard',
    standalone: true,
    imports: [ChartModule, TableModule, TagModule, TimelineModule, BarGraphSkeletonComponent, DashboardCardsSkeletonComponent],
    templateUrl: './module-dashboard.component.html',
    styleUrl: './module-dashboard.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModuleDashboardComponent {
    readonly title = input.required<string>();
    readonly subtitle = input('Operational overview with placeholder data');
    readonly loading = input(false);
    readonly kpis = input.required<DashboardKpi[]>();

    readonly barData = computed(() => ({
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
            {
                label: this.title(),
                data: [42, 68, 54, 79, 63, 88],
                backgroundColor: 'color-mix(in srgb, var(--primary-color) 68%, transparent)',
                borderColor: 'var(--primary-color)',
                borderWidth: 1,
                borderRadius: 6
            }
        ]
    }));

    readonly doughnutData = {
        labels: ['Completed', 'In progress', 'Pending'],
        datasets: [{ data: [58, 27, 15], backgroundColor: ['#22c55e', '#f59e0b', '#64748b'] }]
    };

    readonly chartOptions = {
        maintainAspectRatio: false,
        plugins: { legend: { labels: { color: 'var(--text-color)' } } },
        scales: {
            x: { ticks: { color: 'var(--text-color-secondary)' }, grid: { color: 'var(--surface-border)' } },
            y: { ticks: { color: 'var(--text-color-secondary)' }, grid: { color: 'var(--surface-border)' } }
        }
    };

    readonly activity = [
        { title: 'Configuration updated', detail: 'Module settings were reviewed', date: 'Today, 10:30', icon: 'pi pi-cog', color: '#6366f1' },
        { title: 'Report generated', detail: 'Monthly summary is ready', date: 'Yesterday, 16:10', icon: 'pi pi-file', color: '#22c55e' },
        { title: 'Workflow assigned', detail: 'A sample task was assigned', date: '18 Aug, 09:15', icon: 'pi pi-send', color: '#f59e0b' }
    ];

    readonly rows = [
        { id: 'NC-1001', name: 'Quarterly review', owner: 'John Doe', status: 'Completed', updated: '22 Aug 2026' },
        { id: 'NC-1002', name: 'Pending approvals', owner: 'Anita Rao', status: 'In Progress', updated: '21 Aug 2026' },
        { id: 'NC-1003', name: 'Data verification', owner: 'Amit Kumar', status: 'New', updated: '20 Aug 2026' },
        { id: 'NC-1004', name: 'Configuration audit', owner: 'Sara Khan', status: 'Completed', updated: '19 Aug 2026' },
        { id: 'NC-1005', name: 'Department summary', owner: 'Ravi Singh', status: 'In Progress', updated: '18 Aug 2026' }
    ];

    severity(status: string): 'success' | 'warn' | 'info' {
        if (status === 'Completed') return 'success';
        if (status === 'In Progress') return 'warn';
        return 'info';
    }
}
