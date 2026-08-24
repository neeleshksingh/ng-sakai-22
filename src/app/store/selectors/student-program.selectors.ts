import { createFeatureSelector, createSelector } from '@ngrx/store';
import { StudentProgramState } from '../models/student-program.model';
import { studentProgramsFeatureKey } from '../reducers/student-program.reducer';

export const selectStudentProgramState = createFeatureSelector<StudentProgramState>(studentProgramsFeatureKey);

// ─── Core state slices ──────────────────────────────────────────────────────

export const selectStudentPrograms = createSelector(
    selectStudentProgramState,
    (state) => state.programs
);

export const selectStudentProgramsLoaded = createSelector(
    selectStudentProgramState,
    (state) => state.loaded
);

export const selectStudentProgramsLoading = createSelector(
    selectStudentProgramState,
    (state) => state.loading
);

export const selectStudentProgramsError = createSelector(
    selectStudentProgramState,
    (state) => state.error
);

/**
 * Internal fingerprint selector — used by effects to detect user-switch.
 * Stores the `applicationUser.userName` of the session for which the
 * programs were last successfully loaded.
 */
export const selectStudentProgramsLoadedForUserName = createSelector(
    selectStudentProgramState,
    (state) => state.loadedForUserName
);

// ─── Derived selectors ──────────────────────────────────────────────────────

/**
 * Returns the first student program where `isCurrentOperationalVertical` is true.
 * Useful for dashboard tile info and semester registration checks.
 */
export const selectCurrentOperationalVerticalProgram = createSelector(
    selectStudentPrograms,
    (programs) => programs.find((p) => p.isCurrentOperationalVertical === true) ?? null
);
