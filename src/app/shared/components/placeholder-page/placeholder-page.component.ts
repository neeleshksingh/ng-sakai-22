import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-placeholder-page',
    standalone: true,
    templateUrl: './placeholder-page.component.html',
    styleUrl: './placeholder-page.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlaceholderPageComponent {
    private readonly route = inject(ActivatedRoute);

    readonly title = this.route.snapshot.data['title'] ?? 'Feature';
    readonly description = this.route.snapshot.data['description'] ?? 'This module is under development.';
}
