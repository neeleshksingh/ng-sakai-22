import { ChangeDetectionStrategy, Component, model, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { TextareaModule } from 'primeng/textarea';

@Component({
    selector: 'app-pending-feedback-dialog',
    standalone: true,
    imports: [FormsModule, ButtonModule, DialogModule, TextareaModule],
    templateUrl: './pending-feedback-dialog.component.html',
    styleUrl: './pending-feedback-dialog.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PendingFeedbackDialogComponent {
    readonly visible = model(false);
    readonly submitted = output<string>();
    feedback = '';

    submit(): void {
        this.submitted.emit(this.feedback);
        this.visible.set(false);
    }
}
