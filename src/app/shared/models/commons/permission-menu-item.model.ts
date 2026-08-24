import { MenuItem } from "primeng/api";

export interface PermissionMenuItem extends MenuItem {
    permission?: string | string[];
    createPermission?: string;
}