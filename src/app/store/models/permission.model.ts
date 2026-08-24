export interface Permission {
    permissionId: number;
    permissionName: string;
    hasPermission: boolean;
    type: string;
}

export interface PermissionsState {
    permissions: Permission[];
    userHasPermission: Map<string, boolean>;
    loaded: boolean;
    loading: boolean;
}