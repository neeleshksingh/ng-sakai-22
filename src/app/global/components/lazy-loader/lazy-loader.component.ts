import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ProgressBarModule } from 'primeng/progressbar';
import { LoadingService } from '@/app/shared/services/loading.service';

@Component({
    selector: 'app-lazy-loader',
    standalone: true,
    imports: [ProgressBarModule],
    templateUrl: './lazy-loader.component.html',
    styleUrl: './lazy-loader.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LazyLoaderComponent {
    readonly loadingService = inject(LoadingService);
    private readonly router = inject(Router);
    private readonly destroyRef = inject(DestroyRef);

    constructor() {
        this.router.events.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((event) => {
            if (event instanceof NavigationStart) this.loadingService.show();
            if (event instanceof NavigationEnd || event instanceof NavigationCancel || event instanceof NavigationError) this.loadingService.hide();
        });
    }
}
