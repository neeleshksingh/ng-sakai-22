import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DashboardKpi, ModuleDashboardComponent } from '@/app/global/components/module-dashboard/module-dashboard.component';

@Component({ selector: 'app-finance-pro-dashboard', standalone: true, imports: [ModuleDashboardComponent], templateUrl: './dashboard.component.html', styleUrl: './dashboard.component.scss', changeDetection: ChangeDetectionStrategy.OnPush })
export class FinanceProDashboardComponent {
    readonly kpis: DashboardKpi[] = [
        { label: 'Collections', value: '₹28.4L', icon: 'pi pi-wallet', tone: 'blue' },
        { label: 'Outstanding', value: '₹6.2L', icon: 'pi pi-clock', tone: 'orange' },
        { label: 'Receipts', value: '1,864', icon: 'pi pi-receipt', tone: 'green' },
        { label: 'Pending Vouchers', value: '34', icon: 'pi pi-file', tone: 'purple' }
    ];
}
