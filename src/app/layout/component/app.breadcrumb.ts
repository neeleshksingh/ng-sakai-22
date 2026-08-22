import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
    selector: 'app-breadcrumb',
    standalone: true,
    template: `<nav class="ncore-breadcrumb" aria-label="Breadcrumb">
        <strong>Sarala Birla University</strong>
        <i class="pi pi-angle-right"></i>
        <span>{{ pageTitle() }}</span>
    </nav>`,
    styles: [
        `
            .ncore-breadcrumb {
                display: flex;
                align-items: center;
                gap: 0.45rem;
                min-width: 0;
                white-space: nowrap;
            }
            .ncore-breadcrumb strong {
                color: var(--text-color);
            }
            .ncore-breadcrumb span {
                overflow: hidden;
                text-overflow: ellipsis;
            }
        `
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppBreadcrumb {
    private readonly router = inject(Router);
    private readonly activatedRoute = inject(ActivatedRoute);
    private readonly destroyRef = inject(DestroyRef);

    readonly pageTitle = signal('Dashboard');

    constructor() {
        this.updateTitle();
        this.router.events
            .pipe(
                filter((event) => event instanceof NavigationEnd),
                takeUntilDestroyed(this.destroyRef)
            )
            .subscribe(() => this.updateTitle());
    }

    private updateTitle(): void {
        let route = this.activatedRoute;
        while (route.firstChild) route = route.firstChild;
        this.pageTitle.set(route?.snapshot?.title ?? route?.snapshot?.data?.['title'] ?? 'Dashboard');
    }
}
