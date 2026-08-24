import { createAction, props } from '@ngrx/store';
import { Permission } from '../models/permission.model';

export const loadPermissions = createAction('[Permissions] Load Permissions');
export const loadPermissionsSuccess = createAction(
    '[Permissions] Load Permissions Success',
    props<{ permissions: Permission[] }>()
);
export const loadPermissionsFailure = createAction(
    '[Permissions] Load Permissions Failure',
    props<{ error: any }>()
);