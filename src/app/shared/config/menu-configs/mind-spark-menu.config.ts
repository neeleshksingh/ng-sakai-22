import { PermissionMenuItem } from 'src/app/shared/models/commons/permission-menu-item.model';

export const MINDSPARK_MENU: PermissionMenuItem[] = [
    {
        label: 'Dashboard',
        icon: 'fas fa-home-user',
        routerLink: ['/home/mindspark/dashboard'],
    },

    // ==================== MASTERS ====================
    {
        label: 'Masters',
        icon: 'fas fa-database',
        items: [
            {
                label: 'Paper Code Module Sub-Module',
                icon: 'pi pi-fw pi-book',
                routerLink: [
                    '/home/mindspark/masters/paper-code-sub-module-view',
                ],
                permission: 'SubjectPaperCodeModuleSubModuleMasters_Menu',
            },
            {
                label: 'Batch Schedule',
                icon: 'pi pi-fw pi-calendar',
                routerLink: ['/home/mindspark/masters/batch-schedule-list'],
                permission: 'BatchScheduleMasters_Menu',
            },
            {
                label: 'Faculty Subject Allocation',
                icon: 'pi pi-fw pi-users',
                routerLink: [
                    '/home/mindspark/masters/faculty-subject-allocation-list',
                ],
                permission: 'FacultySubjectAllocationMasters_Menu',
            },
        ],
    },

    // ==================== TRANSACTIONS ====================
    {
        label: 'Transactions',
        icon: 'fas fa-cash-register',
        items: [
            {
                label: 'Student Program Paper Code Allocation',
                icon: 'pi pi-fw pi-file',
                routerLink: [
                    '/home/mindspark/transactions/student-program-paper-code-allocation',
                ],
                permission: 'StudentProgramPaperCodeAllocationTransactions_Menu',
            },
            {
                label: 'Student Program Year Back - Manage',
                icon: 'pi pi-fw pi-caret-left',
                routerLink: [
                    '/home/mindspark/transactions/student-program-year-back',
                ],
                permission: 'StudentProgramYearBackTransactions_Menu',
            },
            {
                label: 'Batch',
                icon: 'pi pi-fw pi-list',
                routerLink: ['/home/mindspark/transactions/batch-list'],
                permission: 'BatchTransactions_Menu',
            },
            {
                label: 'Batch Schedule',
                icon: 'pi pi-fw pi-calendar',
                routerLink: ['/home/mindspark/transactions/batch-schedule'],
                permission: 'BatchScheduleTransactions_Menu',
            },
            {
                label: 'Batch Room Planner',
                icon: 'pi pi-fw pi-lock',
                routerLink: ['/home/mindspark/transactions/batch-room-planner'],
                permission: 'BatchRoomPlannerTransactions_Menu',
            },
            {
                label: 'Batch Close',
                icon: 'pi pi-fw pi-lock',
                routerLink: ['/home/mindspark/transactions/batch-close'],
                permission: 'BatchCloseTransactions_Menu',
            },
            {
                label: 'Batch Transfer',
                icon: 'pi pi-fw pi-sliders-h',
                items: [
                    {
                        label: 'Batch Transfer(New)',
                        icon: 'pi pi-fw pi-arrow-right',
                        routerLink: [
                            '/home/mindspark/transactions/batch-transfer',
                        ],
                        permission: 'StudentBatchTransferNewTransactions_Menu',
                    },
                    {
                        label: 'Batch To Batch',
                        icon: 'pi pi-fw pi-arrows-h',
                        routerLink: [
                            '/home/mindspark/transactions/batch-to-batch-transfer',
                        ],
                        permission: 'StudentBatchToBatchTransferTransactions_Menu',
                    },
                    {
                        label: 'Batch Transfer Update',
                        icon: 'pi pi-fw pi-arrow-circle-up',
                        routerLink: [
                            '/home/mindspark/transactions/batch-transfer-update',
                        ],
                        permission: 'StudentBatchTransferUpdateTransactions_Menu',
                    },
                ],
            },
            {
                label: 'Batch Attendance',
                icon: 'pi pi-fw pi-check-square',
                items: [
                    {
                        label: 'Mark Attendance - 1.0',
                        icon: 'pi pi-fw pi-check',
                        routerLink: [
                            '/home/mindspark/transactions/batch-attendance',
                        ],
                        permission: 'BatchAttendanceTransactions_Menu',
                    },
                    {
                        label: 'Mark Attendance - 2.0',
                        icon: 'pi pi-fw pi-check',
                        routerLink: [
                            '/home/mindspark/transactions/batch-attendance-v2',
                        ],
                        permission: 'BatchAttendanceTransactions_Menu',
                    },
                    {
                        label: 'Attendance Update - 1.0',
                        icon: 'pi pi-fw pi-pencil',
                        routerLink: [
                            '/home/mindspark/transactions/batch-attendance-update',
                        ],
                        permission: 'BatchAttendanceUpdateTransactions_Menu',
                    },
                ],
            },
            {
                label: 'Batch Merge',
                icon: 'pi pi-fw pi-sort-alt',
                items: [
                    {
                        label: 'Create Merged Batch',
                        icon: 'pi pi-fw pi-plus-circle',
                        routerLink: [
                            '/home/mindspark/transactions/batch-merge',
                        ],
                        permission: 'CreateMergedBatchTransactions_Menu',
                    },
                    {
                        label: 'Merged Batches',
                        icon: 'pi pi-fw pi-eye',
                        routerLink: [
                            '/home/mindspark/transactions/merged-batch-list',
                        ],
                        permission: 'MergedBatchesListTransactions_Menu',
                    },
                ],
            },
            {
                label: 'Student Batch Transfer Bridge',
                icon: 'pi pi-fw pi-refresh',
                routerLink: [
                    '/home/mindspark/transactions/student-batch-transfer-bridge',
                ],
                permission: 'StudentBatchTransferBridgeTransactions_Menu',
            },
            {
                label: 'Student Program - Section Update',
                icon: 'pi pi-fw pi-users',
                routerLink: [
                    '/home/mindspark/transactions/student-section-update',
                ],
                permission: 'StudentSectionUpdateTransactions_Menu',
            },
            {
                label: 'Student Program - Sub Section Update',
                icon: 'pi pi-fw pi-sitemap',
                routerLink: [
                    '/home/mindspark/transactions/student-sub-section-update',
                ],
                permission: 'StudentSubSectionUpdateTransactions_Menu',
            },
            {
                label: 'Academic Schedule',
                icon: 'pi pi-fw pi-calendar',
                routerLink: ['/home/mindspark/transactions/academic-schedule'],
                permission: 'AcademicScheduleTransactions_Menu',
            },
            {
                label: 'Student Status',
                icon: 'pi pi-fw pi-chart-line',
                routerLink: ['/home/mindspark/transactions/student-status-list'],
                permission: 'StudentStatusTransactions_Menu'
            },
        ],
    },

    // ==================== REPORTS ====================
    {
        label: 'Reports',
        icon: 'fas fa-file-lines',
        items: [
            {
                label: 'Student',
                icon: 'pi pi-fw pi-user',
                items: [
                    {
                        label: 'Student Information Center',
                        icon: 'pi pi-fw pi-id-card',
                        routerLink: [
                            '/home/mindspark/reports/students/student-information-center',
                        ],
                        permission: 'StudentInformationCenter_Menu',
                    },
                    {
                        label: 'Student Subject Allocations',
                        icon: 'pi pi-fw pi-book',
                        routerLink: [
                            '/home/mindspark/reports/student/student-paper-code-allocation-report',
                        ],
                        permission: 'StudentSubjectAllocationReports_Menu',
                    },
                    {
                        label: 'Student Program',
                        icon: 'pi pi-fw pi-sitemap',
                        routerLink: [
                            '/home/mindspark/reports/student/student-program-report',
                        ],
                        permission: 'StudentProgramReports_Menu',
                    },
                    {
                        label: 'Student Academics Report',
                        icon: 'pi pi-fw pi-chart-line',
                        routerLink: [
                            '/home/mindspark/reports/student/student-academics-report',
                        ],
                        permission: 'StudentAcademicsReports_Menu',
                    },
                ],
            },
            {
                label: 'Batch Timetable',
                icon: 'pi pi-fw pi-calendar',
                routerLink: ['/home/mindspark/reports/batch-timetable'],
                permission: 'BatchTimetableReports_Menu',
            },
            {
                label: 'Academic Schedule',
                icon: 'pi pi-fw pi-calendar',
                routerLink: ['/home/mindspark/reports/academic-schedule'],
                permission: 'AcademicScheduleReports_Menu',
            },
            {
                label: 'Batch Reports',
                icon: 'pi pi-fw pi-folder',
                items: [
                    {
                        label: 'Batch Schedule',
                        icon: 'pi pi-fw pi-calendar',
                        routerLink: [
                            '/home/mindspark/reports/batch-reports/batch-schedule-report',
                        ],
                        permission: 'BatchScheduleReports_Menu',
                    },
                    {
                        label: 'Batch Transfer',
                        icon: 'pi pi-fw pi-sliders-h',
                        routerLink: [
                            '/home/mindspark/reports/batch-reports/batch-transfer-report',
                        ],
                        permission: 'BatchTransferReports_Menu',
                    },
                    {
                        label: 'Batch Attendance Pending',
                        icon: 'pi pi-fw pi-clock',
                        routerLink: [
                            '/home/mindspark/reports/batch-reports/batch-attendance-pending-report',
                        ],
                        permission: 'BatchAttendancePendingReports_Menu',
                    },
                    {
                        label: 'Batch Attendance - v1',
                        icon: 'pi pi-fw pi-check-square',
                        routerLink: [
                            '/home/mindspark/reports/batch-reports/batch-attendance-report',
                        ],
                        permission: 'BatchAttendanceReports_Menu',
                    },
                    {
                        label: 'Batch (Section) Attendance - v2',
                        icon: 'pi pi-fw pi-check-square',
                        routerLink: [
                            '/home/mindspark/reports/batch-reports/section-attendance-v2-report',
                        ],
                        permission: 'BatchSectionAttendanceReports_Menu',
                    },
                    {
                        label: 'Batch Attendance(Faculty-wise) - v2',
                        icon: 'pi pi-fw pi-check-square',
                        routerLink: [
                            '/home/mindspark/reports/batch-reports/faculty-attendance-v2-report',
                        ],
                        permission: 'BatchAttendanceFacultyWiseReports_Menu',
                    },
                    {
                        label: 'Batch Attendance%',
                        icon: 'pi pi-fw pi-percentage',
                        routerLink: [
                            '/home/mindspark/reports/batch-reports/batch-attendance-percentage-report',
                        ],
                        permission: 'BatchAttendancePercentageReports_Menu',
                    },
                    {
                        label: 'Batch Attendance Summary',
                        icon: 'pi pi-fw pi-list',
                        routerLink: [
                            '/home/mindspark/reports/batch-reports/batch-attendance-summary-report',
                        ],
                        permission: 'BatchAttendanceSummaryReports_Menu',
                    },
                    {
                        label: 'Batch Attendance Cumulative',
                        icon: 'pi pi-fw pi-chart-bar',
                        routerLink: [
                            '/home/mindspark/reports/batch-reports/batch-attendance-cumulative-report',
                        ],
                        permission: 'BatchAttendanceCumulativeReports_Menu',
                    },
                    {
                        label: 'Faculty Batch Attendance Matrix',
                        icon: 'pi pi-fw pi-table',
                        routerLink: [
                            '/home/mindspark/reports/batch-reports/faculty-batch-attendance-matrix',
                        ],
                        permission: 'FacultyBatchAttendanceMatrixReports_Menu',
                    },
                    {
                        label: 'Faculty Code Batch Attendance Pending',
                        icon: 'pi pi-fw pi-table',
                        routerLink: [
                            '/home/mindspark/reports/batch-reports/faculty-code-batch-attendance-pending',
                        ],
                        permission:
                            'FacultyCodeBatchAttendancePendingReports_Menu',
                    },
                    {
                        label: 'Batch Attendance For Running Semester',
                        icon: 'pi pi-fw pi-table',
                        routerLink: [
                            '/home/mindspark/reports/batch-reports/batch-Attendance-running-semester-report',
                        ],
                        permission: 'BatchAttendanceRunningSemesterReports_Menu',
                    },
                ],
            },
        ],
    },

    // ==================== HELP ====================
    {
        label: 'Help',
        icon: 'fas fa-file-lines',
        items: [
            {
                label: 'Batch Attendance',
                icon: 'pi pi-fw pi-user',
                items: [
                    {
                        label: 'How to update Batch Attendance?',
                        icon: 'pi pi-fw pi-id-card',
                        routerLink: [
                            '/home/mindspark/help-guides/help/mark-attendance-help',
                        ],
                        permission: 'MarkAttendanceHelp_Menu',
                    },
                ],
            },
        ],
    },
];
