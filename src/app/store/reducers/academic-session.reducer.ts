import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { AcademicSession } from 'src/app/shared/models/cloudbytes/academic-session';
import { AcademicSessionActions } from '../actions/academic-session.actions';

export const academicSessionsFeatureKey = 'academicSessions';

export interface AcademicSessionState extends EntityState<AcademicSession> {
    loaded: boolean;
    loading: boolean;
    error: any;
}

export const adapter: EntityAdapter<AcademicSession> = createEntityAdapter<AcademicSession>({
    selectId: (session: AcademicSession) => session.id ?? 0,
    sortComparer: false,
});

export const initialState: AcademicSessionState = adapter.getInitialState({
    loaded: false,
    loading: false,
    error: null,
});

export const academicSessionReducer = createReducer(
    initialState,
    on(AcademicSessionActions.loadAcademicSessions, (state) => ({
        ...state,
        loading: true,
        error: null,
    })),
    on(AcademicSessionActions.loadAcademicSessionsSuccess, (state, { sessions }) =>
        adapter.setAll(sessions, {
            ...state,
            loading: false,
            loaded: true,
        })
    ),
    on(AcademicSessionActions.loadAcademicSessionsFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    }))
);