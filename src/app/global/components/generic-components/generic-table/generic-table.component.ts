import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { TableModule } from 'primeng/table';

export interface GenericTableColumn {
    field: string;
    header: string;
}

@Component({
    selector: 'app-generic-table',
    standalone: true,
    imports: [TableModule],
    templateUrl: './generic-table.component.html',
    styleUrl: './generic-table.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GenericTableComponent {
    readonly title = input('Records');
    readonly columns = input<GenericTableColumn[]>([]);
    readonly rows = input<Record<string, unknown>[]>([]);
}
