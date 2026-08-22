import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { TagModule } from 'primeng/tag';

@Component({ selector: 'app-role-tag', standalone: true, imports: [TagModule], templateUrl: './role-tag.component.html', styleUrl: './role-tag.component.scss', changeDetection: ChangeDetectionStrategy.OnPush })
export class RoleTagComponent {
    readonly role = input.required<string>();
    readonly severity = computed<'success' | 'warn' | 'info' | 'secondary'>(() => {
        if (this.role().toLowerCase().includes('admin')) return 'warn';
        if (this.role().toLowerCase().includes('faculty')) return 'info';
        if (this.role().toLowerCase().includes('student')) return 'success';
        return 'secondary';
    });
}
