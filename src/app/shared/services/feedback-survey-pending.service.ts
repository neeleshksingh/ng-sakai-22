import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class FeedbackSurveyPendingService {
    readonly pending = signal(false);
}
