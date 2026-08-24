import { PermissionMenuItem } from 'src/app/shared/models/commons/permission-menu-item.model';

export const DIGITALFINGERS_MENU: PermissionMenuItem[] = [
    { label: 'Dashboard', icon: 'fas fa-house-user', routerLink: ['/home/digitalfingers/dashboard'] },

    // ==================== MASTERS ====================
    {
        label: 'Masters', icon: 'fas fa-database',
        items: [
            { label: 'Roles', icon: 'pi pi-fw pi-id-card', routerLink: ['/home/digitalfingers/masters/roles'], permission: 'ApplicationRoleMasters_Menu' },
            { label: 'Permissions', icon: 'pi pi-fw pi-lock', routerLink: ['/home/digitalfingers/masters/permissions'], permission: 'PermissionMasters_Menu' },
            { label: 'Permission Matrix', icon: 'pi pi-fw pi-table', routerLink: ['/home/digitalfingers/masters/permission-matrix'], permission: 'PermissionMatrixMasters_Menu' },
            { label: 'User Permissions', icon: 'pi pi-fw pi-user-edit', routerLink: ['/home/digitalfingers/masters/user-permissions'], permission: 'UserPermissionMasters_Menu' },
            { label: 'Background Service Options', icon: 'pi pi-fw pi-cog', routerLink: ['/home/digitalfingers/masters/background-service-options'], permission: 'BackgroundServiceOptionsMasters_Menu' }
        ]
    },

    // ==================== TRANSACTIONS ====================
    {
        label: 'Transactions', icon: 'fas fa-cash-register',
        items: [
            {
                label: 'Users', icon: 'pi pi-fw pi-users',
                items: [
                    { label: 'Sign up', icon: 'pi pi-fw pi-user-plus', routerLink: ['/home/digitalfingers/transactions/user-signup'], permission: 'SignUpTransactions_Menu' },
                    { label: 'Reset Password', icon: 'pi pi-fw pi-key', routerLink: ['/home/digitalfingers/transactions/reset-password'], permission: 'ResetPasswordTransactions_Menu' },
                    { label: 'User List', icon: 'pi pi-fw pi-list', routerLink: ['/home/digitalfingers/transactions/user-list'], permission: 'UserListTransactions_Menu' },
                    { label: 'Import User', icon: 'pi pi-fw pi-upload', routerLink: ['/home/digitalfingers/transactions/import-user'], permission: 'ImportUserTransactions_Menu' },
                    { label: 'Assign Roles', icon: 'pi pi-fw pi-id-card', routerLink: ['/home/digitalfingers/transactions/user-roles'], permission: 'AssignRolesTransactions_Menu' },
                    { label: 'Lock Unlock User', icon: 'pi pi-fw pi-lock-open', routerLink: ['/home/digitalfingers/transactions/lock-users'], permission: 'LockUnlockUserTransactions_Menu' }
                ]
            },
            {
                label: 'Service Request', icon: 'pi pi-fw pi-briefcase',
                items: [
                    { label: 'Pending Request', icon: 'pi pi-fw pi-clock', routerLink: ['/home/digitalfingers/transactions/service-request-pending-view'], permission: 'PendingRequestTransactions_Menu' }
                ]
            }
        ]
    }
];