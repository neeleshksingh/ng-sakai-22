import { createReducer, on } from '@ngrx/store';
import { StudentProgramActions } from '../actions/student-program.actions';
import { StudentProgramState } from '../models/student-program.model';

export const studentProgramsFeatureKey = 'studentPrograms';

export const initialState: StudentProgramState = {
    programs: [],
    loadedForUserName: null,
    loaded: false,
    loading: false,
    error: null,
};

export const studentProgramReducer = createReducer(
    initialState,
    on(StudentProgramActions.loadStudentPrograms, (state) => ({
        ...state,
        loading: true,
        error: null,
    })),
    on(StudentProgramActions.loadStudentProgramsSuccess, (state, { programs, loadedForUserName }) => ({
        ...state,
        programs,
        loadedForUserName,
        loading: false,
        loaded: true,
        error: null,
    })),
    on(StudentProgramActions.loadStudentProgramsFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    })),
    on(StudentProgramActions.clearStudentPrograms, () => ({ ...initialState })),
    on(StudentProgramActions.refreshStudentPrograms, (state) => ({
        ...state,
        loaded: false,
        loading: false,
        error: null,
    }))
);
