import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, concatMap, map, withLatestFrom } from 'rxjs/operators';
import { StudentService } from 'src/app/students/services/student.service';
import { StudentProfileActions } from '../actions/student-profile.actions';
import { selectStudentProfileLoaded, selectStudentProfileLoadedForUserName } from '../selectors/student-profile.selectors';

@Injectable()
export class StudentProfileEffects {
    private actions$ = inject(Actions);
    private studentService = inject(StudentService);
    private store = inject(Store);

    /**
     * Resolves the currently logged-in user's userName and roles from localStorage.
     * Returns null if no valid session exists.
     */
    private getCurrentUserContext(): { userName: string; roles: string[] } | null {
        const raw = localStorage.getItem('currentUser');
        if (!raw) return null;
        try {
            const parsed = JSON.parse(raw);
            const userName: string | null = parsed?.applicationUser?.userName ?? null;
            const roles: string[] = parsed?.applicationUser?.roles ?? [];
            if (!userName) return null;
            return { userName, roles };
        } catch {
            return null;
        }
    }

    /**
     * Loads the student profile from API.
     *
     * Guards:
     * 1. Role guard — only proceeds if the current user has the 'Student' role.
     * 2. Duplicate-load guard — skips the API call when the profile is already
     *    loaded for the exact same logged-in user (compared via `userName`).
     * 3. User-switch guard — forces a fresh fetch when a different student logs in
     *    after a previous session (fingerprint mismatch).
     */
    loadStudentProfile$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(StudentProfileActions.loadStudentProfile),
            withLatestFrom(
                this.store.select(selectStudentProfileLoaded),
                this.store.select(selectStudentProfileLoadedForUserName)
            ),
            concatMap(([_action, loaded, loadedForUserName]) => {
                const ctx = this.getCurrentUserContext();

                // Guard 1: Only fetch for users with the 'Student' role
                if (!ctx || !ctx.roles.some((r) => r === 'Student')) {
                    return [];
                }

                // Guard 2 & 3: Skip only when already loaded for THIS exact user
                if (loaded && loadedForUserName === ctx.userName) {
                    return [];
                }

                return this.studentService.GetStudentProfile().pipe(
                    map((profile) =>
                        StudentProfileActions.loadStudentProfileSuccess({
                            profile,
                            loadedForUserName: ctx.userName,
                        })
                    ),
                    catchError((error) =>
                        of(StudentProfileActions.loadStudentProfileFailure({ error }))
                    )
                );
            })
        );
    });

    /**
     * Force re-fetches the student profile (e.g. after the student updates their
     * own profile). `refreshStudentProfile` resets `loaded` in the reducer so the
     * next `loadStudentProfile` dispatch bypasses the duplicate-load guard.
     */
    refreshStudentProfile$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(StudentProfileActions.refreshStudentProfile),
            map(() => StudentProfileActions.loadStudentProfile())
        );
    });
}
