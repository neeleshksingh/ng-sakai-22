import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { KeyValuePipe } from '@angular/common';

@Component({
    selector: 'app-generic-view',
    standalone: true,
    imports: [KeyValuePipe],
    templateUrl: './generic-view.component.html',
    styleUrl: './generic-view.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GenericViewComponent {
    readonly title = input('Record details');
    readonly data = input<Record<string, unknown>>({});
}
