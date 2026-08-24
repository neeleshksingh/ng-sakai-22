import { Student } from 'src/app/shared/models/students/student';

export interface StudentProfileState {
    profile: Student | null;
    /**
     * Fingerprint: stores the `applicationUser.userName` of the user for whom
     * the profile was last fetched. Used to detect user-switch scenarios (e.g.
     * different student logs in after logout). Compared against the current
     * userName in localStorage before deciding to skip or re-fetch.
     */
    loadedForUserName: string | null;
    loaded: boolean;
    loading: boolean;
    error: any;
}
