import { PermissionMenuItem } from 'src/app/shared/models/commons/permission-menu-item.model';

export const SETTINGS_MENU: PermissionMenuItem[] = [
    {
        label: 'Profile', icon: 'pi pi-fw pi-user', badgeStyleClass: 'text-badge',
        items: [
            { label: 'View', icon: 'pi pi-fw pi-eye', routerLink: ['/home/smallbizgurus/employees/employee/Profile'] },
        ]
    },

    // ==================== APPLICATIONS ====================
    // {
    //     label: 'Applications', icon: 'pi pi-fw pi-folder-open', badgeStyleClass: 'text-badge',
    //     items: [
    //         {
    //             label: 'Refresh Cached Data', icon: 'pi pi-fw pi-refresh', badgeStyleClass: 'text-badge', routerLink: ['/home/settings/applications/refresh-cached-data']
    //         },
    //     ]
    // },

    // ==================== SECURITY ====================
    {
        label: 'Security', icon: 'pi pi-fw pi-lock', badgeStyleClass: 'text-badge',
        items: [
            {
                label: 'Password', icon: 'pi pi-fw pi-key',
                items: [
                    {
                        label: 'Change Password', icon: 'pi pi-fw pi-pencil', routerLink: ['/home/settings/security/change-password']
                    }
                ]
            },
        ]
    },
];