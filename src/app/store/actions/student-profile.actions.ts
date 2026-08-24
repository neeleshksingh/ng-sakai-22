import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Student } from 'src/app/shared/models/students/student';

export const StudentProfileActions = createActionGroup({
    source: 'Student Profile',
    events: {
        'Load Student Profile': emptyProps(),
        'Load Student Profile Success': props<{ profile: Student; loadedForUserName: string }>(),
        'Load Student Profile Failure': props<{ error: any }>(),
        'Clear Student Profile': emptyProps(),
        'Refresh Student Profile': emptyProps(),
    },
});
