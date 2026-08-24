import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, RouterStateSnapshot, UrlTree } from '@angular/router';
import { FeedbackSurveyPendingService } from '../services/feedback-survey-pending.service';

/**
 * Blocks navigation to any route other than the current pending survey URL.
 * Once all surveys are submitted (queue is empty) all navigation is allowed.
 */
@Injectable({ providedIn: 'root' })
export class SurveyPendingGuard implements CanActivate, CanActivateChild {

    constructor(
        private surveyPendingService: FeedbackSurveyPendingService,
    ) { }

    canActivate(
        _route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot,
    ): boolean | UrlTree {
        const pendingUrl = this.surveyPendingService.currentPendingUrl;

        // No pending survey — allow all navigation
        if (!pendingUrl) {
            return true;
        }

        // Allow navigation to the pending survey URL itself (with or without query params)
        if (state.url === pendingUrl || state.url.startsWith(pendingUrl + '?')) {
            return true;
        }

        // Block navigation — the dialog handles navigation to the survey URL
        return false;
    }

    canActivateChild(
        childRoute: ActivatedRouteSnapshot,
        state: RouterStateSnapshot,
    ): boolean | UrlTree {
        return this.canActivate(childRoute, state);
    }
}
