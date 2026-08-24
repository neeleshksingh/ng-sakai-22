import { PermissionMenuItem } from 'src/app/shared/models/commons/permission-menu-item.model';

export const DEVELOPERS_MENU: PermissionMenuItem[] = [
    { label: 'Dashboard', icon: 'fas fa-house-user', routerLink: ['/home/developers/dashboard/dashboard'] },

    // ==================== MASTERS ====================
    {
        label: 'Masters', icon: 'fas fa-database', badgeStyleClass: 'text-badge',
        items: [
            { label: 'Parter App Settings', icon: 'pi pi-fw pi-images', routerLink: ['/home/developers/masters/partner-app-setting-list'], permission: 'PartnerAppSetting_Menu' }
        ]
    }
];