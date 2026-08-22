import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
    selector: 'app-dashboard-cards-skeleton',
    standalone: true,
    imports: [SkeletonModule],
    templateUrl: './dashboard-cards-skeleton.component.html',
    styleUrl: './dashboard-cards-skeleton.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardCardsSkeletonComponent {}
