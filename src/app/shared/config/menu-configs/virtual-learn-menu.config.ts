import { PermissionMenuItem } from 'src/app/shared/models/commons/permission-menu-item.model';

export const VIRTUALLEARN_MENU: PermissionMenuItem[] = [
    { label: 'Dashboard', icon: 'fas fa-home-user', routerLink: ['/home/virtuallearn/dashboard'] },

    // ==================== MASTERS ====================
    {
        label: 'Masters', icon: 'fas fa-database',
        items: [
            {
                label: 'Books', icon: 'pi pi-fw pi-book',
                routerLink: ['/home/virtuallearn/masters/book-list'],
                permission: 'BookMasters_Menu'
            },
            {
                label: 'Vendor Master', icon: 'pi pi-fw pi-server',
                routerLink: ['/home/virtuallearn/masters/vendor-master-list'],
                permission: 'VendorMasterMasters_Menu'
            },
            {
                label: 'Library', icon: 'pi pi-fw pi-bookmark',
                routerLink: ['/home/virtuallearn/masters/library-list'],
                permission: 'LibraryMasters_Menu'
            },
            {
                label: 'Library Room', icon: 'pi pi-fw pi-building',
                routerLink: ['/home/virtuallearn/masters/library-room-list'],
                permission: 'LibraryRoomMasters_Menu'
            },
            {
                label: 'Library Wardrobe', icon: 'pi pi-fw pi-database',
                routerLink: ['/home/virtuallearn/masters/library-wardrobe-list'],
                permission: 'LibraryWardrobeMasters_Menu'
            },
            {
                label: 'Library Section', icon: 'pi pi-fw pi-bookmark',
                routerLink: ['/home/virtuallearn/masters/library-section-list'],
                permission: 'LibrarySectionMasters_Menu'
            },
        ]
    },

    // ==================== TRANSACTIONS ====================
    {
        label: 'Transactions', icon: 'fas fa-cash-register',
        items: [
            {
                label: 'Book Purchase Requisition', icon: 'pi pi-fw pi-paypal',
                routerLink: ['/home/virtuallearn/transactions/book-purchase-requisition-list'],
                permission: 'BookPurchaseRequisitionTransactions_Menu'
            },
            {
                label: 'Book Purchase Order', icon: 'pi pi-fw pi-money-bill',
                routerLink: ['/home/virtuallearn/transactions/book-purchase-order-list'], permission: 'BookPurchaseOrderTransactions_Menu'
            },
            {
                label: 'Book Purchase', icon: 'pi pi-fw pi-shopping-bag',
                routerLink: ['/home/virtuallearn/transactions/book-purchase-list'], permission: 'BookPurchaseTransactions_Menu'
            },
            {
                label: 'Book Transaction', icon: 'pi pi-fw pi-briefcase',
                routerLink: ['/home/virtuallearn/transactions/book-transaction-list'], permission: 'BookTransactionTransactions_Menu'
            },
            {
                label: 'Book Location', icon: 'pi pi-fw pi-map-marker',
                routerLink: ['/home/virtuallearn/transactions/book-location'],
                permission: 'BookLocationTransactions_Menu'
            },
            {
                label: 'Library Membership', icon: 'pi pi-fw pi-envelope',
                routerLink: ['/home/virtuallearn/transactions/library-membership-list'], permission: 'LibraryMembershipTransactions_Menu'
            },
            {
                label: 'Library Login/Logout', icon: 'pi pi-fw pi-sign-in',
                routerLink: ['/home/virtuallearn/transactions/library-membership-log-status'],
                permission: 'LibraryMemberLogStatusTransactions_Menu'
            },
        ]
    },

    // ==================== REPORTS ====================
    {
        label: 'Reports', icon: 'fas fa-file-lines',
        items: [
            {
                label: 'Issue/Return Book Report', icon: 'pi pi-fw pi-book',
                routerLink: ['/home/virtuallearn/reports/issue-return-book-report'],
                permission: 'Issue/ReturnBookReports_Menu'
            },
            {
                label: 'Accession Register Department Wise', icon: 'pi pi-fw pi-envelope', routerLink: ['/home/virtuallearn/reports/accession-registration-department-report'],
                permission: 'AccessionRegisterDepartmentWiseReports_Menu'
            },
            {
                label: 'Book Lost Report', icon: 'pi pi-fw pi-exclamation-triangle', routerLink: ['/home/virtuallearn/reports/book-lost-report'],
                permission: 'BookLostReports_Menu'
            },
        ]
    },
];