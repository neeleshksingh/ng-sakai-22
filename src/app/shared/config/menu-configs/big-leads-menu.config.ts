import { PermissionMenuItem } from 'src/app/shared/models/commons/permission-menu-item.model';

export const BIGLEADS_MENU: PermissionMenuItem[] = [
    { label: 'Dashboard', icon: 'fas fa-home-user', routerLink: ['/home/bigleads/dashboard'] },

    //====================== Masters ======================
    {
        label: 'Masters', icon: 'fas fa-database',
        items: [
            {   label: 'Student Group', icon: 'fas fa-users', routerLink: ['/home/bigleads/masters/student-group-list'],
                permission: 'StudentGroupMasters_Menu' 
            }
        ]
    },

    // ==================== TRANSACTIONS ====================
    {
        label: 'Transactions', icon: 'fas fa-cash-register',
        items: [
            {
                label: 'Service Request', icon: 'fas fa-briefcase',
                items: [
                    { label: 'Pending Requests', icon: 'pi pi-fw pi-th-large', routerLink: ['/home/bigleads/servicerequest/pending-request'], permission: 'PendingServiceRequestsTransactions_Menu' }
                ]
            },
            {
                label: 'Student', icon: 'pi pi-fw pi-user',
                items: [
                    { label: 'Student', icon: 'pi pi-fw pi-user', routerLink: ['/home/bigleads/transactions/student/student-details-manage'], permission: 'StudentTransactions_Menu' },
                    { label: 'Identity Images', icon: 'pi pi-fw pi-images', routerLink: ['/home/bigleads/transactions/student/student-images'], permission: 'IdentityImagesTransactions_Menu' },
                    { label: 'ID Card', icon: 'pi pi-fw pi-id-card', routerLink: ['/home/bigleads/transactions/student/student-id-card'], permission: 'StudentIdCardTransactions_Menu' },
                    { label: 'Student Register', icon: 'pi pi-fw pi-user-plus', routerLink: ['/home/bigleads/transactions/student/student-register-list'], permission: 'StudentRegisterTransactions_Menu' },
                    { label: 'Manage Student Group', icon: 'pi pi-fw pi-users', routerLink: ['/home/bigleads/transactions/student/manage-student-group/academic-session/0/program/0'],
                    permission : 'StudentGroupTransactions_Menu'
                    },
                ]
            },
            {
                label: 'Student program', icon: 'pi pi-fw pi-book',
                items: [
                    { label: 'Student program manage', icon: 'pi pi-fw pi-book', routerLink: ['/home/bigleads/transactions/student/student-program-manage'], permission: 'StudentProgramTransactions_Menu' },
                    { label: 'Student program Change Request', icon: 'pi pi-fw pi-book', routerLink: ['/home/bigleads/transactions/student/student-program-change-request-list'], permission: 'StudentProgramChangeRequestTransactions_Menu' },
                ]
            },
            {
                label: 'Student Admission Withdrawal', icon: 'pi pi-fw pi-share-alt', routerLink: ['/home/bigleads/transactions/student-admission-withdrawal'], permission: 'StudentAdmissionWithdrawalTransactions_Menu',
            }
        ]
    },

    // ==================== REPORTS ====================
    {
        label: 'Reports', icon: 'fas fa-file-lines',
        items: [
            {
                label: 'Student', icon: 'pi pi-fw pi-user',
                items: [
                    { label: 'Student Information', icon: 'pi pi-fw pi-info-circle', routerLink: ['/home/bigleads/reports/students/student-information-center'], permission: 'StudentInformationCenter_Menu' },
                    { label: 'Student Master Sheet', icon: 'pi pi-fw pi-info-circle', routerLink: ['/home/bigleads/reports/students/student-master-sheet'], permission: 'StudentMasterSheetReports_Menu' },
                    { label: 'Student Register Report', icon: 'pi pi-fw pi-info-circle', routerLink: ['/home/bigleads/reports/students/student-register-report'], permission: 'StudentRegisterReports_Menu' },
                ]
            }
        ]
    }
];