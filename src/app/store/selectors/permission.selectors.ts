import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PermissionsState } from '../models/permission.model';

export const selectPermissionsState = createFeatureSelector<PermissionsState>('permissions');

export const selectAllPermissions = createSelector(
    selectPermissionsState,
    state => state.permissions
);

export const selectUserHasPermission = createSelector(
    selectPermissionsState,
    state => state.userHasPermission
);

export const selectPermissionsLoading = createSelector(
    selectPermissionsState,
    state => state.loading
);

export const selectPermissionsLoaded = createSelector(
    selectPermissionsState,
    state => state.loaded
);

export const selectHasPermission = (permissionName: string) =>
    createSelector(selectUserHasPermission, map => map.get(permissionName) === true);