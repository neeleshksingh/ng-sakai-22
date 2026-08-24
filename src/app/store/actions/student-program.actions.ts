import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { StudentProgram } from 'src/app/shared/models/mindspark/student-program';

export const StudentProgramActions = createActionGroup({
    source: 'Student Program',
    events: {
        'Load Student Programs': emptyProps(),
        'Load Student Programs Success': props<{ programs: StudentProgram[]; loadedForUserName: string }>(),
        'Load Student Programs Failure': props<{ error: any }>(),
        'Clear Student Programs': emptyProps(),
        'Refresh Student Programs': emptyProps(),
    },
});
