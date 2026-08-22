import { ChangeDetectionStrategy, Component, input, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';

@Component({
    selector: 'app-generic-manage',
    standalone: true,
    imports: [FormsModule, ButtonModule, DialogModule, InputTextModule],
    templateUrl: './generic-manage.component.html',
    styleUrl: './generic-manage.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GenericManageComponent {
    readonly title = input('Manage record');
    readonly visible = model(false);
    name = '';
}
