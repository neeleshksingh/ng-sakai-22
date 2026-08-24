import { createFeatureSelector, createSelector } from '@ngrx/store';
import { StudentProfileState } from '../models/student-profile.model';
import { studentProfileFeatureKey } from '../reducers/student-profile.reducer';

export const selectStudentProfileState = createFeatureSelector<StudentProfileState>(studentProfileFeatureKey);

// ─── Core state slices ──────────────────────────────────────────────────────

export const selectStudentProfile = createSelector(
    selectStudentProfileState,
    (state) => state.profile
);

export const selectStudentProfileLoaded = createSelector(
    selectStudentProfileState,
    (state) => state.loaded
);

export const selectStudentProfileLoading = createSelector(
    selectStudentProfileState,
    (state) => state.loading
);

export const selectStudentProfileError = createSelector(
    selectStudentProfileState,
    (state) => state.error
);

/**
 * Internal fingerprint selector — used by effects to detect user-switch.
 * Stores the `applicationUser.userName` of the session for which the profile
 * was last successfully loaded.
 */
export const selectStudentProfileLoadedForUserName = createSelector(
    selectStudentProfileState,
    (state) => state.loadedForUserName
);

// ─── Identity ────────────────────────────────────────────────────────────────

export const selectStudentId = createSelector(
    selectStudentProfile,
    (profile) => profile?.studentId ?? null
);

export const selectStudentProvisionalId = createSelector(
    selectStudentProfile,
    (profile) => profile?.provisionalStudentId ?? null
);

export const selectStudentFullName = createSelector(
    selectStudentProfile,
    (profile) => {
        if (!profile) return '';
        return [profile.firstName, profile.middleName, profile.lastName]
            .filter(Boolean)
            .join(' ')
            .replace(/\s+/g, ' ')
            .trim();
    }
);

export const selectStudentDob = createSelector(
    selectStudentProfile,
    (profile) => profile?.dob ?? null
);

export const selectStudentGender = createSelector(
    selectStudentProfile,
    (profile) => profile?.gender ?? null
);

export const selectStudentAbcId = createSelector(
    selectStudentProfile,
    (profile) => profile?.abcid ?? null
);

// ─── Contact ─────────────────────────────────────────────────────────────────

export const selectStudentEmail = createSelector(
    selectStudentProfile,
    (profile) => profile?.email ?? null
);

export const selectStudentPhoneNumber = createSelector(
    selectStudentProfile,
    (profile) => profile?.phoneNumber ?? null
);

export const selectStudentAlternateEmail = createSelector(
    selectStudentProfile,
    (profile) => profile?.alternateEmail ?? null
);

export const selectStudentAlternatePhoneNumber = createSelector(
    selectStudentProfile,
    (profile) => profile?.alternatePhoneNumber ?? null
);

// ─── Profile image ───────────────────────────────────────────────────────────

export const selectStudentImageUrl = createSelector(
    selectStudentProfile,
    (profile) => profile?.studentImageUrl ?? null
);

export const selectStudentIdentityImagePath = createSelector(
    selectStudentProfile,
    (profile) => profile?.identityImagePath ?? null
);

// ─── Academic / admission ────────────────────────────────────────────────────

export const selectStudentAdmissionDate = createSelector(
    selectStudentProfile,
    (profile) => profile?.admissionDate ?? null
);

export const selectStudentStatus = createSelector(
    selectStudentProfile,
    (profile) => profile?.status ?? null
);

// ─── Caste / category details ────────────────────────────────────────────────

export const selectStudentCasteDetails = createSelector(
    selectStudentProfile,
    (profile) => {
        if (!profile) return null;
        return {
            casteId: profile.casteId ?? null,
            casteName: profile.casteName ?? null,
            casteCategoryId: profile.casteCategoryId ?? null,
            casteCategoryName: profile.casteCategoryName ?? null,
        };
    }
);

export const selectStudentReligionId = createSelector(
    selectStudentProfile,
    (profile) => profile?.religionId ?? null
);

export const selectStudentIsMinority = createSelector(
    selectStudentProfile,
    (profile) => profile?.isMinority ?? false
);

export const selectStudentBloodGroup = createSelector(
    selectStudentProfile,
    (profile) => profile?.bloodGroup ?? null
);
