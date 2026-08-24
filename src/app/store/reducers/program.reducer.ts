import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { Program } from 'src/app/shared/models/cloudbytes/program';
import { ProgramActions } from '../actions/program.actions';

export const programsFeatureKey = 'programs';

export interface ProgramState extends EntityState<Program> {
    loaded: boolean;
    loading: boolean;
    error: any;
}

export const adapter: EntityAdapter<Program> = createEntityAdapter<Program>({
    selectId: (session: Program) => session.id ?? 0,
    sortComparer: false,
});

export const initialState: ProgramState = adapter.getInitialState({
    loaded: false,
    loading: false,
    error: null,
});

export const programReducer = createReducer(
    initialState,
    on(ProgramActions.loadProgram, (state) => ({
        ...state,
        loading: true,
        error: null,
    })),
    on(ProgramActions.loadProgramSuccess, (state, { programs }) =>
        adapter.setAll(programs, {
            ...state,
            loading: false,
            loaded: true,
        })
    ),
    on(ProgramActions.loadProgramFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    }))
);