import { environment } from '@/environments/environment';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRouteSnapshot, NavigationEnd, Router, RouterLink } from '@angular/router';
import { BehaviorSubject, filter } from 'rxjs';

@Component({
    selector: 'app-breadcrumb',
    standalone: true,
    imports: [AsyncPipe, NgForOf, NgIf, RouterLink],
    templateUrl: './app.breadcrumb.html',
    styles: [
        `
            .layout-breadcrumb {
                margin-left: 1rem;

                ol {
                    display: flex;
                    align-items: center;
                    margin: 0;
                    padding: 0;
                    list-style: none;
                    gap: 1rem;
                    flex-wrap: wrap;
                    color: var(--text-color-secondary);

                    a {
                        color: var(--text-color-secondary);
                    }
                }

                .app-name {
                    font-weight: 700;
                    text-transform: uppercase;
                }
            }
        `
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppBreadcrumb {
    private readonly _breadcrumbs$ = new BehaviorSubject<Breadcrumb[]>([]);
    private readonly destroyRef = inject(DestroyRef);

    readonly breadcrumbs$ = this._breadcrumbs$.asObservable();

    constructor(private readonly router: Router) {
        this.updateBreadcrumbs();

        this.router.events
            .pipe(
                filter((event) => event instanceof NavigationEnd),
                takeUntilDestroyed(this.destroyRef)
            )
            .subscribe(() => this.updateBreadcrumbs());
    }

    private updateBreadcrumbs(): void {
        const breadcrumbs: Breadcrumb[] = [];
        this.addBreadcrumb(this.router.routerState.snapshot.root, [], breadcrumbs);
        this._breadcrumbs$.next(breadcrumbs);
    }

    private addBreadcrumb(route: ActivatedRouteSnapshot, parentUrl: string[], breadcrumbs: Breadcrumb[]): void {
        const routeUrl = parentUrl.concat(route.url.map(url => url.path));
        const breadcrumb = route.data['breadcrumb'] ?? route.title ?? route.data['title'];
        const parentBreadcrumb = route.parent
            ? route.parent.data['breadcrumb'] ?? route.parent.title ?? route.parent.data['title']
            : null;

        if (breadcrumb && breadcrumb !== parentBreadcrumb) {
            breadcrumbs.push({
                label: breadcrumb,
                url: '/' + routeUrl.join('/')
            });
        }

        if (route.firstChild) {
            this.addBreadcrumb(route.firstChild, routeUrl, breadcrumbs);
        }
    }

    get partnerName(): string {
        return environment.partner.name;
    }
}

interface Breadcrumb {
    label: string;
    url?: string;
}
