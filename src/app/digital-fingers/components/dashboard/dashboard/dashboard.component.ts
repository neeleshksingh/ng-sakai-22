import { LayoutService } from '@/app/layout/service/layout.service';
import { SharedModule } from '@/shared.module';
import { ChangeDetectorRef, Component, effect, OnDestroy, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { debounceTime, Subscription } from 'rxjs';
import { RoleService } from 'src/app/digital-fingers/services/role.service';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss',
    imports: [SharedModule]
})
export class DashboardComponent implements OnInit, OnDestroy {
    overviewChartData: any;
    overviewChartOptions: any;
    overviewWeeks: any;
    selectedOverviewWeek: any;
    revenueChartData: any;
    revenueChartOptions: any;
    roles: { roleId: string, roleName: string }[] = [];
    selectedRole: any;
    isLoadingRoleChart: boolean = true;
    roleChartError: boolean = false;
    subscription!: Subscription;

    constructor(
        public layoutService: LayoutService,
        private roleService: RoleService,
        private messageService: MessageService,
        private cdr: ChangeDetectorRef
    ) {
        effect(() => {
            this.layoutService.layoutConfig().darkTheme;
        });
    }

    ngOnInit() {
        this.getRoleDistribution();
        this.overviewWeeks = [
            { name: 'Last Week', code: '0' },
            { name: 'This Week', code: '1' }
        ];
        this.selectedOverviewWeek = this.overviewWeeks[0];
    }

    getRoleDistribution() {
        this.isLoadingRoleChart = true;
        this.roleChartError = false;
        this.roles = [];

        this.roleService.getAllRoles().subscribe({
            next: (roles: any) => {
                this.roles = roles.sort((a: any, b: any) => a.roleName.localeCompare(b.roleName));
                this.isLoadingRoleChart = false;
                this.cdr.detectChanges();
            },
            error: (error) => {
                this.isLoadingRoleChart = false;
                this.roleChartError = true;
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Failed to load roles. Please try again later.',
                    life: 5000
                });
                this.cdr.detectChanges();
            }
        });
    }

    changeOverviewWeek() {
        const dataSet1 = [
            [2, 1, 0.5, 0.6, 0.5, 1.3, 1],
            [4.88, 3, 6.2, 4.5, 2.1, 5.1, 4.1]
        ];
        const dataSet2 = [
            [3, 2.4, 1.5, 0.6, 4.5, 3.3, 2],
            [3.2, 4.1, 2.2, 5.5, 4.1, 3.6, 3.5]
        ];

        if (this.selectedOverviewWeek.code === '1') {
            this.overviewChartData.datasets[0].data = dataSet2[parseInt('0')];
            this.overviewChartData.datasets[1].data = dataSet2[parseInt('1')];
        } else {
            this.overviewChartData.datasets[0].data = dataSet1[parseInt('0')];
            this.overviewChartData.datasets[1].data = dataSet1[parseInt('1')];
        }

        this.overviewChartData = { ...this.overviewChartData };
    }

    get colorScheme(): string {
        return this.layoutService.isDarkTheme() ? 'dark' : 'light';
    }

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}