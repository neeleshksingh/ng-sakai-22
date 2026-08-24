import { PermissionMenuItem } from 'src/app/shared/models/commons/permission-menu-item.model';

export const FINANCE_PRO_MENU: PermissionMenuItem[] = [
    { label: 'Dashboard', icon: 'fas fa-house-user', routerLink: ['/home/finpro/dashboard'] },
    // ==================== MASTERS ====================
    {
        label: 'Masters',
        icon: 'fas fa-database',
        badgeStyleClass: 'text-badge',
        items: [
            { label: 'Concession Category', icon: 'pi pi-fw pi-tags', routerLink: ['/home/finpro/masters/student-concession-category-list'], permission: 'StudentConcessionCategoryMasters_Menu' },
            { label: 'Concession Fee Setup', icon: 'pi pi-fw pi-cog', routerLink: ['/home/finpro/masters/student-concession-category-fee-setup-list'], permission: 'StudentConcessionCategoryFeeSetupMasters_Menu' },
            { label: 'Special Fee Component', icon: 'pi pi-fw pi-sliders-h', routerLink: ['/home/finpro/masters/special-fee-component-list'], permission: 'SpecialFeeComponentMasters_Menu' },
            {
                label: 'Account Setup', icon: 'pi pi-cog',
                items: [
                    { label: 'Account Groups', icon: 'pi pi-sitemap', routerLink: ['/home/finpro/masters/account-group-list'], permission: 'AccountGroupMasters_Menu' },
                    { label: 'Account Ledgers', icon: 'pi pi-book', routerLink: ['/home/finpro/masters/account-ledger-list'], permission: 'AccountLedgerMasters_Menu' },
                    { label: 'Account Voucher Types', icon: 'pi pi-file', routerLink: ['/home/finpro/masters/account-voucher-type-list'], permission: 'AccountVoucherTypeMasters_Menu' },
                    { label: 'Company', icon: 'pi pi-building', routerLink: ['/home/finpro/masters/company-list'], permission: 'CompanyMasters_Menu' },
                    { label: 'Voucher Posting Rule', icon: 'pi pi-list', routerLink: ['/home/finpro/masters/voucher-posting-rule-list'], permission: 'VoucherPostingRuleMasters_Menu' },
                ]
            }
        ]
    },
    // ==================== TRANSACTIONS ====================
    {
        label: 'Transactions',
        icon: 'fas fa-cash-register',
        badgeStyleClass: 'text-badge',
        items: [
            { label: 'Voucher Entry', icon: 'pi pi-fw pi-list', routerLink: ['/home/finpro/transactions/voucher/voucher-entry-list'], permission: 'VoucherTransactions_Menu' },
            {
                label: 'Fee Generation',
                icon: 'pi pi-fw pi-wallet',
                items: [
                    { label: 'Fee Generation Program Wise', icon: 'pi pi-fw pi-list', routerLink: ['/home/finpro/transactions/fee-generation/fee-generation-program-wise'], permission: 'FeeGenerationProgramWiseTransactions_Menu' },
                    { label: 'Fee Generation Student Wise', icon: 'pi pi-fw pi-user', routerLink: ['/home/finpro/transactions/fee-generation/fee-generation-student-wise'], permission: 'FeeGenerationStudentWiseTransactions_Menu' }
                ]
            },
            {
                label: 'Fee Modification',
                icon: 'pi pi-fw pi-pencil',
                items: [
                    { label: 'Student Wise', icon: 'pi pi-fw pi-user-edit', routerLink: ['/home/finpro/transactions/fee-modification/fee-modification-student-wise'], permission: 'FeeModificationStudentWiseTransactions_Menu' }
                ]
            },
            {
                label: 'Fee Collection',
                icon: 'pi pi-fw pi-credit-card',
                items: [
                    { label: 'Fee Collection', icon: 'pi pi-fw pi-dollar', routerLink: ['/home/finpro/transactions/fee-collection/fee-collection'], permission: 'FeeCollectionTransactions_Menu' },
                    { label: 'Fee Reconciliation', icon: 'pi pi-fw pi-refresh', routerLink: ['/home/finpro/transactions/fee-collection/fee-reconciliation'], permission: 'FeeReconciliationTransactions_Menu' },
                    { label: 'Cancel Receipt', icon: 'pi pi-fw pi-times-circle', routerLink: ['/home/finpro/transactions/fee-collection/cancel-receipt'], permission: 'CancelReceiptTransactions_Menu' },
                    { label: 'Generate Challan', icon: 'pi pi-fw pi-file-pdf', routerLink: ['/home/finpro/transactions/fee-collection/generate-challan'], permission: 'GenerateChallanTransactions_Menu' },
                    { label: 'Student Onboarding', icon: 'pi pi-fw pi-user-plus', routerLink: ['/home/finpro/transactions/fee-collection/student-onboarding'], permission: 'StudentOnboardingTransactions_Menu' }
                ]
            },
            {
                label: 'Service',
                icon: 'pi pi-fw pi-briefcase',
                items: [
                    { label: 'Facility (Bus/Hostel)', icon: 'pi pi-fw pi-building', routerLink: ['/home/finpro/transactions/service/facility'], permission: 'FacilityServiceTransactions_Menu' },
                ]
            },
            {
                label: 'Certificates',
                icon: 'pi pi-fw pi-file',
                items: [
                    {
                        label: 'Bonafide',
                        icon: 'pi pi-fw pi-id-card',
                        items: [
                            { label: 'For Bank Loan', icon: 'pi pi-fw pi-briefcase', routerLink: ['/home/finpro/transactions/certificates/bonafide-fees'], permission: 'BankLoanBonafideTransactions_Menu' },
                            { label: 'For E-Kalyan', icon: 'pi pi-fw pi-money-bill', routerLink: ['/home/finpro/transactions/certificates/bonafide-e-kalyan'], permission: 'EKalyanBonafideTransactions_Menu' },
                            { label: 'For Job/Placement', icon: 'pi pi-fw pi-briefcase', routerLink: ['/home/finpro/transactions/certificates/bonafide-job'], permission: 'JobBonafideTransactions_Menu' }
                        ]
                    }
                ]
            },
            {
                label: 'Student',
                icon: 'pi pi-fw pi-users',
                permission: 'StudentStatus_Menu',
                items: [
                    { label: 'Student Status', icon: 'pi pi-fw pi-info-circle', routerLink: ['/home/finpro/transactions/student/student-status-list'], permission: 'StudentStatusTransactions_Menu' }
                ]
            },
            { label: 'Examination Scrutiny Application', icon: 'pi pi-fw pi-file-edit', routerLink: ['/home/finpro/transactions/examination-scrutiny-application'], permission: 'ExaminationScrutinyApplicationTransactions_Menu' },
            { label: 'Student Admission Withdrawal', icon: 'pi pi-fw pi-sign-out', routerLink: ['/home/finpro/transactions/student-admission-withdrawal'], permission: 'StudentAdmissionWithdrawalTransactions_Menu' }
        ]
    },
    // ==================== REPORTS ====================
    {
        label: 'Reports',
        icon: 'fas fa-file-lines',
        //permission: 'FinProReports_Menu',
        items: [
            {
                label: 'Statement of Accounts',
                icon: 'pi pi-fw pi-chart-bar',
                items: [
                    { label: 'Account Group', icon: 'pi pi-fw pi-sitemap', routerLink: ['/home/finpro/reports/statement-of-accounts/account-group-list-report'], permission: 'AccountGroupReports_Menu' },
                    { label: 'Account Ledger', icon: 'pi pi-fw pi-book', routerLink: ['/home/finpro/reports/statement-of-accounts/account-ledgers-report'], permission: 'AccountLedgerReports_Menu' },
                    { label: 'Account Ledger Unused', icon: 'pi pi-fw pi-bookmark', routerLink: ['/home/finpro/reports/statement-of-accounts/account-ledgers-unused-report'], permission: 'AccountLedgerUnusedReports_Menu' },
                    { label: 'Voucher Report', icon: 'pi pi-fw pi-list', routerLink: ['/home/finpro/reports/statement-of-accounts/voucher-report'], permission: 'VoucherReports_Menu' },
                    { label: 'Account Group Ledger Summary', icon: 'pi pi-fw pi-book', routerLink: ['/home/finpro/reports/statement-of-accounts/account-group-ledger-summary-report'], permission: 'AccountGroupLedgerSummaryReports_Menu' },
                    { label: 'Account Group Voucher Summary', icon: 'pi pi-fw pi-clone', routerLink: ['/home/finpro/reports/statement-of-accounts/account-group-voucher-summary-report'], permission: 'AccountGroupVoucherSummaryReports_Menu' },
                    { label: 'Account Ledger Voucher Summary', icon: 'pi pi-fw pi-list', routerLink: ['/home/finpro/reports/statement-of-accounts/account-ledger-voucher-summary-report'], permission: 'AccountLedgerVoucherSummaryReports_Menu' },
                    { label: 'Statisctics Report', icon: 'pi pi-fw pi-chart-bar', routerLink: ['/home/finpro/reports/statement-of-accounts/statistics-report'], permission: 'StatisticsReports_Menu' },
                ]
            },
            {
                label: 'Accounts',
                icon: 'pi pi-fw pi-dollar',
                items: [
                    { label: 'Fee Generation', icon: 'pi pi-fw pi-comment', routerLink: ['/home/finpro/reports/accounts/fee-generation'], permission: 'FeeGenerationReports_Menu' },
                    { label: 'Fee Concession', icon: 'pi pi-fw pi-cloud', routerLink: ['/home/finpro/reports/accounts/fee-concession-report'], permission: 'FeeConcessionReports_Menu' },
                    { label: 'Daily Collection Report', icon: 'pi pi-fw pi-compass', routerLink: ['/home/finpro/reports/accounts/daily-collection-report'], permission: 'DailyCollectionReports_Menu' },
                    { label: 'Head Wise Collection Report', icon: 'pi pi-fw pi-pound', routerLink: ['/home/finpro/reports/accounts/headwise-collection-report'], permission: 'HeadWiseCollectionReports_Menu' },
                    { label: 'Student Ledger Report', icon: 'pi pi-fw pi-desktop', routerLink: ['/home/finpro/reports/accounts/studentFee-ledger-report'], permission: 'StudentLedgerReports_Menu' },
                    { label: 'Student Ledger Report - V2', icon: 'pi pi-fw pi-desktop', routerLink: ['/home/finpro/reports/accounts/studentFee-ledger-report/v2'], permission: 'StudentLedgerReports_Menu' },
                    { label: 'Student Fee Master Summary', icon: 'pi pi-fw pi-book', routerLink: ['/home/finpro/reports/accounts/student-fee-master-summary/academic-session/0/program/0/operational-vertical/0'], permission: 'StudentFeeMasterSummaryReports_Menu' },
                    { label: 'Student Defaulter List Report', icon: 'pi pi-fw pi-file', routerLink: ['/home/finpro/reports/accounts/defaulter-list-report'], permission: 'StudentDefaulterListReports_Menu' },
                    { label: 'Fee Receipt', icon: 'pi pi-fw pi-chart-bar', routerLink: ['/home/finpro/reports/accounts/fee-receipt-report'], permission: 'FeeReceiptReports_Menu' },
                    { label: 'Cancelled Receipt', icon: 'pi pi-fw pi-minus-circle', routerLink: ['/home/finpro/reports/accounts/cancelled-receipt-report'], permission: 'CancelledReceiptReports_Menu' }
                ]
            },
            {
                label: 'Student',
                icon: 'pi pi-fw pi-user',
                items: [
                    { label: 'Student Defaulters Report', icon: 'pi pi-fw pi-info', routerLink: ['/home/finpro/reports/student/student-defaulters-report'], permission: 'StudentDefaultersReports_Menu' },
                    { label: 'Student Onboarding Report', icon: 'pi pi-fw pi-info', routerLink: ['/home/finpro/reports/student/student-onboarding-report'], permission: 'StudentOnboardingReports_Menu' },
                    { label: 'Student Information Center', icon: 'pi pi-fw pi-info-circle', routerLink: ['/home/finpro/reports/students/student-information-center'], permission: 'StudentInformationCenter_Menu' },
                    { label: 'Student Program', icon: 'pi pi-fw pi-external-link', routerLink: ['/home/finpro/reports/Student/student-program'], permission: 'StudentProgramReports_Menu' },
                    { label: 'Student Semester Registration status Report', icon: 'pi pi-fw pi-comment', routerLink: ['/home/finpro/reports/Student/student-semester-registration-status'], permission: 'StudentSemesterRegistrationStatusReports_Menu' },
                    { label: 'Student Topper List', icon: 'pi pi-fw pi-hashtag', routerLink: ['/home/finpro/reports/Student/topper-list'], permission: 'StudentTopperListReports_Menu' }
                ]
            },
            {
                label: 'User List',
                icon: 'pi pi-fw pi-user-plus',
                routerLink: ['/home/finpro/reports/user-list'], permission: 'UserListReports_Menu'
            }
        ]
    }
];