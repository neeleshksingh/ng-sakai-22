import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Program } from 'src/app/shared/models/cloudbytes/program';

export const ProgramActions = createActionGroup({
    source: 'Program',
    events: {
        'Load Program': emptyProps(),
        'Load Program Success': props<{ programs: Program[] }>(),
        'Load Program Failure': props<{ error: any }>(),
    },
});