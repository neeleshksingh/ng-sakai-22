import { createFeatureSelector, createSelector } from '@ngrx/store';
import { adapter, programsFeatureKey, ProgramState } from '../reducers/program.reducer';

export const selectProgramState = createFeatureSelector<ProgramState>(programsFeatureKey);

const { selectAll, selectEntities } = adapter.getSelectors();

export const selectAllPrograms = createSelector(
    selectProgramState,
    selectAll
);

export const selectProgramsLoaded = createSelector(
    selectProgramState,
    (state) => state.loaded
);

export const selectProgramsLoading = createSelector(
    selectProgramState,
    (state) => state.loading
);

export const selectProgramList = createSelector(
    selectAllPrograms,
    (programs) => {
        if (!programs) {
            return [];
        }
        return programs.map((s) => ({ label: s.name, value: s.id }));
    }
);

export const selectPublishedProgramOptions = createSelector(
    selectAllPrograms,
    (programs) => {
        return programs
            .filter(s => s?.status?.toUpperCase() === 'PUBLISHED')
            .map(s => ({ label: s.name, value: s.id }))
    }
);