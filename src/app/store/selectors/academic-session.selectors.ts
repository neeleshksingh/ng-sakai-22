import { createFeatureSelector, createSelector } from '@ngrx/store';
import { academicSessionsFeatureKey, AcademicSessionState, adapter } from '../reducers/academic-session.reducer';

export const selectAcademicSessionState = createFeatureSelector<AcademicSessionState>(academicSessionsFeatureKey);

const { selectAll, selectEntities } = adapter.getSelectors();

export const selectAllAcademicSessions = createSelector(
    selectAcademicSessionState,
    selectAll
);

export const selectAcademicSessionsLoaded = createSelector(
    selectAcademicSessionState,
    (state) => state.loaded
);

export const selectAcademicSessionsLoading = createSelector(
    selectAcademicSessionState,
    (state) => state.loading
);

export const selectSessionList = createSelector(
    selectAllAcademicSessions,
    (sessions) => {
        if (!sessions) {
            return [];
        }
        return sessions.map((s) => ({ label: s.name, value: s.id }));
    }
);

export const selectPublishedAcademicSessionOptions = createSelector(
    selectAllAcademicSessions,
    (sessions) => {
        return sessions
            .filter(s => s?.status?.toUpperCase() === 'PUBLISHED')
            .map(s => ({ label: s.name, value: s.id }))
            .sort((a, b) => {
                const yearA = parseInt((a.label ?? '').split('-')[0]) || 0;
                const yearB = parseInt((b.label ?? '').split('-')[0]) || 0;
                return yearA - yearB;
            });
    }
);