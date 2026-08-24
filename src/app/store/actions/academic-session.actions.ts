import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { AcademicSession } from 'src/app/shared/models/cloudbytes/academic-session';

export const AcademicSessionActions = createActionGroup({
    source: 'Academic Session',
    events: {
        'Load Academic Sessions': emptyProps(),
        'Load Academic Sessions Success': props<{ sessions: AcademicSession[] }>(),
        'Load Academic Sessions Failure': props<{ error: any }>(),
    },
});