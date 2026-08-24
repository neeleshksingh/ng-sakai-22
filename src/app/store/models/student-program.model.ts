import { StudentProgram } from 'src/app/shared/models/mindspark/student-program';

export interface StudentProgramState {
    programs: StudentProgram[];
    /**
     * Fingerprint: stores the `applicationUser.userName` of the user for whom
     * the programs were last fetched. Used to detect user-switch scenarios
     * (e.g. different student logs in after logout). Compared against the
     * current userName in localStorage before deciding to skip or re-fetch.
     */
    loadedForUserName: string | null;
    loaded: boolean;
    loading: boolean;
    error: any;
}
