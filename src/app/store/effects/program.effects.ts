import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, concatMap, map, withLatestFrom } from 'rxjs/operators';
import { ProgramService } from 'src/app/global/services/cloudbytes/program.service';
import { ProgramActions } from '../actions/program.actions';
import { selectProgramsLoaded } from '../selectors/program.selectors';

@Injectable()
export class ProgramEffects {
    private actions$ = inject(Actions);
    private programService = inject(ProgramService);
    private store = inject(Store);

    loadPrograms$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(ProgramActions.loadProgram),
            withLatestFrom(this.store.select(selectProgramsLoaded)),
            concatMap(([action, loaded]) => {
                if (loaded) {
                    return [];
                }
                return this.programService.getAll().pipe(
                    map((programs) => ProgramActions.loadProgramSuccess({ programs })),
                    catchError((error) => of(ProgramActions.loadProgramFailure({ error })))
                );
            })
        );
    });
}