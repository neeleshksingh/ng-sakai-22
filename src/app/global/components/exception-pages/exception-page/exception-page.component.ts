import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({ selector: 'app-exception-page', standalone: true, imports: [RouterLink, ButtonModule], templateUrl: './exception-page.component.html', styleUrl: './exception-page.component.scss', changeDetection: ChangeDetectionStrategy.OnPush })
export class ExceptionPageComponent {
    private readonly route = inject(ActivatedRoute);
    readonly code = this.route.snapshot.data['code'] ?? '404';
    readonly title = this.route.snapshot.data['title'] ?? 'Page not found';
    readonly description = this.route.snapshot.data['description'] ?? 'The page you requested could not be found.';
    readonly icon = this.route.snapshot.data['icon'] ?? 'pi pi-compass';
}
