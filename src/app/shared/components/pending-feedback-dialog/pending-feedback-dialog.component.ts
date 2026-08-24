import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subject, filter, takeUntil } from 'rxjs';
import { SharedModule } from '@/shared.module';
import { FeedbackSurveyPendingService, PendingFeedbackDialogModel } from '../../services/feedback-survey-pending.service';

@Component({
    selector: 'app-pending-feedback-dialog',
    standalone: true,
    imports: [SharedModule],
    templateUrl: './pending-feedback-dialog.component.html',
    styleUrl: './pending-feedback-dialog.component.scss',
})
export class PendingFeedbackDialogComponent implements OnInit, OnDestroy {
    dialogModel: PendingFeedbackDialogModel | null = null;
    visible = false;

    private destroy$ = new Subject<void>();

    constructor(
        private feedbackSurveyPendingService: FeedbackSurveyPendingService,
        private router: Router,
    ) { }

    ngOnInit(): void {
        this.feedbackSurveyPendingService.pendingDialog$
            .pipe(takeUntil(this.destroy$))
            .subscribe(model => {
                this.dialogModel = model;
                this._updateVisibility();
            });

        this.router.events
            .pipe(
                filter(e => e instanceof NavigationEnd),
                takeUntil(this.destroy$),
            )
            .subscribe(() => this._updateVisibility());
    }

    navigate(): void {
        if (!this.dialogModel?.navigateUrl) return;
        this.visible = false;
        this.router.navigate([this.dialogModel.navigateUrl]);
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    private _updateVisibility(): void {
        if (!this.dialogModel) {
            this.visible = false;
            return;
        }
        const currentUrl = this.router.url.split('?')[0];
        this.visible = currentUrl !== this.dialogModel.navigateUrl;
    }
}
