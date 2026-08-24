import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import {
    FeedbackSurveyTracking,
} from '../models/global/feedback-survey-tracking';

/**
 * Model consumed by PendingFeedbackDialogComponent to render the mandatory dialog.
 */
export interface PendingFeedbackDialogModel {
    title: string;
    message: string;
    detailLines: { label: string; value: string }[];
    navigateUrl: string;
}

/**
 * Map each boolean flag to its survey destination URL.
 * Add or change entries here to control which surveys are enforced and where they navigate.
 */
export const SURVEY_URL_CONFIG_STUDENTS: { key: keyof FeedbackSurveyTracking; url: string }[] = [
    {
        key: 'hasOrganisationStudentSurveyInternalPending',
        url: '/home/students/student-satisfaction-survey',
    },
    {
        key: 'hasBatchFacultyFeedbackPending',
        url: '/home/students/student-feedback',
    },
];

export const SURVEY_URL_CONFIG_EMPLOYEES: { key: keyof FeedbackSurveyTracking; url: string }[] = [
    {
        key: 'hasOrganisationFacultyFeedbackInternalPending',
        url: '/home/executiveedge/transactions/faculty-feedback',
    }
];

@Injectable({ providedIn: 'root' })
export class FeedbackSurveyPendingService {

    private readonly _pendingDialog$ = new BehaviorSubject<PendingFeedbackDialogModel | null>(null);
    /** Incremented on every reset(). Used to discard stale HTTP callbacks. */
    private _sessionToken = 0;

    /** Emits the current mandatory dialog model, or null when nothing is pending. */
    readonly pendingDialog$ = this._pendingDialog$.asObservable();

    /** The survey URL the user must complete right now, or null if none are pending. */
    get currentPendingUrl(): string | null {
        return this._pendingDialog$.value?.navigateUrl ?? null;
    }

    constructor(private router: Router) { }

    /**
     * Clears the pending state without navigating and returns a new session token.
     * Pass the token to initFromTracking — calls with a stale token are silently dropped.
     */
    reset(): number {
        this._pendingDialog$.next(null);
        return ++this._sessionToken;
    }

    /**
     * Inspects the API response and, if a pending survey is found (via boolean flags),
     * emits a dialog model. Does NOT navigate automatically — navigation is driven by
     * the dialog's Navigate button.
     * Accepts a single FeedbackSurveyTracking object or an array (takes the first element).
     */
    initFromTracking(tracking: FeedbackSurveyTracking | FeedbackSurveyTracking[], sessionToken: number): void {
        if (sessionToken !== this._sessionToken) {
            return;
        }

        const currentUser = localStorage.getItem('currentUser') ?? '';
        let parsedCurrentUser: any;
        try {
            parsedCurrentUser = JSON.parse(currentUser);
        } catch {
            return;
        }
        const roles: string[] = parsedCurrentUser?.applicationUser?.roles ?? [];

        const data: FeedbackSurveyTracking = Array.isArray(tracking) ? tracking[0] : tracking;
        if (!data) {
            return;
        }

        const isStudent = roles.some((r: string) => r.toUpperCase() === 'STUDENT');
        const model = isStudent
            ? this._buildStudentDialogModel(data)
            : this._buildEmployeeDialogModel(data);

        this._pendingDialog$.next(model);
    }

    /**
     * Re-evaluates tracking data after a survey is submitted.
     * Resets the session, then re-runs the pending-survey detection so the next
     * pending item (if any) is shown, or the dialog is dismissed if all are done.
     * Call this from survey components after a successful submission instead of markCurrentComplete().
     */
    recheck(tracking: FeedbackSurveyTracking | FeedbackSurveyTracking[]): void {
        const token = this.reset();
        this.initFromTracking(tracking, token);
    }

    // ─── Private helpers ────────────────────────────────────────────────────────

    private _buildStudentDialogModel(
        data: FeedbackSurveyTracking,
    ): PendingFeedbackDialogModel | null {

        // Priority 1: Organisation Student Survey Internal
        if (data.hasOrganisationStudentSurveyInternalPending === true) {
            const url = SURVEY_URL_CONFIG_STUDENTS.find(
                c => c.key === 'hasOrganisationStudentSurveyInternalPending',
            )!.url;
            const details: { label: string; value: string }[] = [];
            const record = data.organisationStudentSurveyInternalTrackingResponses?.[0];
            if (record?.studentName) details.push({ label: 'Student', value: record.studentName });
            if (record?.status) details.push({ label: 'Status', value: record.status });
            return {
                title: 'Student Satisfaction Survey Pending',
                message: 'A mandatory satisfaction survey is pending. Please complete the survey to continue.',
                detailLines: details,
                navigateUrl: url,
            };
        }

        // Priority 2: Batch Faculty Feedback
        if (data.hasBatchFacultyFeedbackPending === true) {
            const url = SURVEY_URL_CONFIG_STUDENTS.find(
                c => c.key === 'hasBatchFacultyFeedbackPending',
            )!.url;
            const details: { label: string; value: string }[] = [];
            const record = data.batchFacultyFeedbackTrackingResponses?.[0];
            if (record?.batchCode) details.push({ label: 'Batch', value: record.batchCode });
            if (record?.status) details.push({ label: 'Status', value: record.status });
            return {
                title: 'Faculty Feedback Pending',
                message: 'A mandatory faculty feedback is pending. Please complete the feedback to continue.',
                detailLines: details,
                navigateUrl: url,
            };
        }

        return null;
    }

    private _buildEmployeeDialogModel(
        data: FeedbackSurveyTracking,
    ): PendingFeedbackDialogModel | null {

        if (data.hasOrganisationFacultyFeedbackInternalPending !== true) {
            return null;
        }

        const url = SURVEY_URL_CONFIG_EMPLOYEES.find(
            c => c.key === 'hasOrganisationFacultyFeedbackInternalPending',
        )!.url;
        const details: { label: string; value: string }[] = [];
        const record = data.organisationFeedbackInternalTrackingResponses?.[0];
        if (record?.studentName) details.push({ label: 'Name', value: record.studentName });
        if (record?.employeeCode) details.push({ label: 'Employee Code', value: record.employeeCode });
        if (record?.status) details.push({ label: 'Status', value: record.status });
        return {
            title: 'Internal Feedback Survey Pending',
            message: 'A mandatory internal feedback survey required your attention. Please complete the survey to continue.',
            detailLines: details,
            navigateUrl: url,
        };
    }
}