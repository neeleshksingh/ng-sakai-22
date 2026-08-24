import { createReducer, on } from '@ngrx/store';
import { StudentProfileActions } from '../actions/student-profile.actions';
import { StudentProfileState } from '../models/student-profile.model';

export const studentProfileFeatureKey = 'studentProfile';

export const initialState: StudentProfileState = {
    profile: null,
    loadedForUserName: null,
    loaded: false,
    loading: false,
    error: null,
};

export const studentProfileReducer = createReducer(
    initialState,
    on(StudentProfileActions.loadStudentProfile, (state) => ({
        ...state,
        loading: true,
        error: null,
    })),
    on(StudentProfileActions.loadStudentProfileSuccess, (state, { profile, loadedForUserName }) => ({
        ...state,
        profile,
        loadedForUserName,
        loading: false,
        loaded: true,
        error: null,
    })),
    on(StudentProfileActions.loadStudentProfileFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    })),
    on(StudentProfileActions.clearStudentProfile, () => ({ ...initialState })),
    on(StudentProfileActions.refreshStudentProfile, (state) => ({
        ...state,
        loaded: false,
        loading: false,
        error: null,
    }))
);
