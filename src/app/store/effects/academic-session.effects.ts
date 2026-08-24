import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, concatMap, map, withLatestFrom } from 'rxjs/operators';
import { AcademicSessionService } from 'src/app/cloud-bytes/services/academic-session.service';
import { AcademicSessionActions } from '../actions/academic-session.actions';
import { selectAcademicSessionsLoaded } from '../selectors/academic-session.selectors';

@Injectable()
export class AcademicSessionEffects {
    private actions$ = inject(Actions);
    private academicSessionService = inject(AcademicSessionService);
    private store = inject(Store);

    loadAcademicSessions$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(AcademicSessionActions.loadAcademicSessions),
            withLatestFrom(this.store.select(selectAcademicSessionsLoaded)),
            concatMap(([action, loaded]) => {
                if (loaded) {
                    return [];
                }
                return this.academicSessionService.getAll().pipe(
                    map((sessions) => AcademicSessionActions.loadAcademicSessionsSuccess({ sessions })),
                    catchError((error) => of(AcademicSessionActions.loadAcademicSessionsFailure({ error })))
                );
            })
        );
    });
}