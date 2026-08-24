import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, concatMap, map, withLatestFrom } from 'rxjs/operators';
import { StudentProgramService } from 'src/app/students/services/student-program.service';
import { StudentProgramActions } from '../actions/student-program.actions';
import { selectStudentProgramsLoaded, selectStudentProgramsLoadedForUserName } from '../selectors/student-program.selectors';

@Injectable()
export class StudentProgramEffects {
    private actions$ = inject(Actions);
    private studentProgramService = inject(StudentProgramService);
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
     * Loads student programs from API.
     *
     * Guards:
     * 1. Role guard — only proceeds if the current user has the 'Student' role.
     * 2. Duplicate-load guard — skips the API call when the programs are already
     *    loaded for the exact same logged-in user (compared via `userName`).
     * 3. User-switch guard — forces a fresh fetch when a different student logs in
     *    after a previous session (fingerprint mismatch).
     */
    loadStudentPrograms$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(StudentProgramActions.loadStudentPrograms),
            withLatestFrom(
                this.store.select(selectStudentProgramsLoaded),
                this.store.select(selectStudentProgramsLoadedForUserName)
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

                return this.studentProgramService.getStudentProgramList().pipe(
                    map((programs) =>
                        StudentProgramActions.loadStudentProgramsSuccess({
                            programs,
                            loadedForUserName: ctx.userName,
                        })
                    ),
                    catchError((error) =>
                        of(StudentProgramActions.loadStudentProgramsFailure({ error }))
                    )
                );
            })
        );
    });

    /**
     * Force re-fetches student programs (e.g. after periodic refresh timer).
     * `refreshStudentPrograms` resets `loaded` in the reducer so the next
     * `loadStudentPrograms` dispatch bypasses the duplicate-load guard.
     */
    refreshStudentPrograms$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(StudentProgramActions.refreshStudentPrograms),
            map(() => StudentProgramActions.loadStudentPrograms())
        );
    });
}
