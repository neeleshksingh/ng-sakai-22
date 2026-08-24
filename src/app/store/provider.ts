import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { AcademicSessionEffects } from './effects/academic-session.effects';
import { PermissionsEffects } from './effects/permissions.effects';
import { StudentProfileEffects } from './effects/student-profile.effects';
import { StudentProgramEffects } from './effects/student-program.effects';
import { academicSessionReducer } from './reducers/academic-session.reducer';
import { permissionsReducer } from './reducers/permission.reducer';
import { programReducer } from './reducers/program.reducer';
import { studentProfileReducer } from './reducers/student-profile.reducer';
import { studentProgramReducer } from './reducers/student-program.reducer';
import { ProgramEffects } from './effects/program.effects';

export function provideAppStore(): EnvironmentProviders {
    return makeEnvironmentProviders([
        provideStore({
            permissions: permissionsReducer,
            academicSessions: academicSessionReducer,
            programs: programReducer,
            studentProfile: studentProfileReducer,
            studentPrograms: studentProgramReducer,
        }),
        provideEffects([
            // PermissionsEffects,
            AcademicSessionEffects,
            ProgramEffects,
            StudentProfileEffects,
            StudentProgramEffects,
        ]),
        provideStoreDevtools({
            maxAge: 25,
            logOnly: false,
        }),
    ]);
}