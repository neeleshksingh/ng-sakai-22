import { createReducer, on } from '@ngrx/store';
import * as PermissionsActions from '../actions/permissions.actions';
import { PermissionsState } from '../models/permission.model';

export const initialState: PermissionsState = {
    permissions: [],
    userHasPermission: new Map(),
    loaded: false,
    loading: false
};

export const permissionsReducer = createReducer(
    initialState,
    on(PermissionsActions.loadPermissions, state => ({ ...state, loading: true })),
    on(PermissionsActions.loadPermissionsSuccess, (state, { permissions }) => {
        const userHasPermission = new Map<string, boolean>();

        permissions.forEach(p => {
            userHasPermission.set(p.permissionName, p.hasPermission);
        });

        return {
            ...state,
            permissions,
            userHasPermission,
            loaded: true,
            loading: false
        };
    }),
    on(PermissionsActions.loadPermissionsFailure, state => ({ ...state, loading: false }))
);