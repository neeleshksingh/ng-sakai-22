import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
    selector: 'app-bar-graph-skeleton',
    standalone: true,
    imports: [SkeletonModule],
    templateUrl: './bar-graph-skeleton.component.html',
    styleUrl: './bar-graph-skeleton.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BarGraphSkeletonComponent {}
