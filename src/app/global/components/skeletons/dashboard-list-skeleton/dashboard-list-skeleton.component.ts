import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
    selector: 'app-dashboard-list-skeleton',
    standalone: true,
    imports: [SkeletonModule],
    templateUrl: './dashboard-list-skeleton.component.html',
    styleUrl: './dashboard-list-skeleton.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardListSkeletonComponent {}
