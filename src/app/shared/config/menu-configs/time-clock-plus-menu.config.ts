import { PermissionMenuItem } from 'src/app/shared/models/commons/permission-menu-item.model';

export const TIME_CLOCK_PLUS_MENU: PermissionMenuItem[] = [
    {
        label: 'Dashboard',
        icon: 'fas fa-home-user',
        routerLink: ['/home/timeclockplus/dashboard'],
    },

    // ==================== MASTERS ====================
    {
        label: 'Masters',
        icon: 'fas fa-database',
        items: [
            {
                label: 'Leave Year',
                icon: 'pi pi-fw pi-calendar',
                routerLink: ['/home/timeclockplus/masters/leave-year-list'],
                permission: ['LeaveYearMasters_Menu'],
            },
            {
                label: 'Leave Scheme',
                icon: 'pi pi-fw pi-sitemap',
                routerLink: ['/home/timeclockplus/masters/leave-scheme-list'],
                permission: ['LeaveSchemeMasters_Menu'],
            },
            {
                label: 'Leave Type',
                icon: 'pi pi-fw pi-list',
                routerLink: ['/home/timeclockplus/masters/leave-type-list'],
                permission: ['LeaveTypeMasters_Menu'],
            },
            {
                label: 'Leave Policy',
                icon: 'pi pi-fw pi-briefcase',
                routerLink: ['/home/timeclockplus/masters/leave-policy-list'],
                permission: ['LeavePolicyMasters_Menu'],
            },
            {
                label: 'Leave Periodicity',
                icon: 'pi pi-fw pi-microsoft',
                routerLink: [
                    '/home/timeclockplus/masters/leave-periodicity-list',
                ],
                permission: ['LeavePeriodicityMasters_Menu'],
            },
            {
                label: 'Leave Scheme Leave Type Rule',
                icon: 'pi pi-fw pi-book',
                routerLink: [
                    '/home/timeclockplus/masters/leave-scheme-leave-type-rule-list',
                ],
                permission: ['LeaveSchemeLeaveTypeRuleMasters_Menu'],
            },
            {
                label: 'Employee Filter',
                icon: 'pi pi-fw pi-filter',
                routerLink: [
                    '/home/timeclockplus/masters/employee-filter-list',
                ],
                permission: ['EmployeeFilterMasters_Menu'],
            },
            {
                label: 'Employee Leave Policy Mapping',
                icon: 'pi pi-fw pi-map',
                routerLink: [
                    '/home/timeclockplus/masters/employee-leave-policy-mapping-list',
                ],
                permission: ['EmployeeLeavePolicyMappingMasters_Menu'],
            },
            {
                label: 'Leave Request Approval Level List',
                icon: 'pi pi-fw pi-list',
                routerLink: [
                    '/home/timeclockplus/masters/leave-request-approval-level-list',
                ],
                permission: ['LeaveRequestApprovalLevelMasters_Menu'],
            },
            {
                label: 'Employee Leave Request Advance Setting',
                icon: 'pi pi-fw pi-cog',
                routerLink: [
                    '/home/timeclockplus/masters/employee-leave-request-advance-setting',
                ],
                permission: ['EmployeeLeaveRequestAdvancedSettingMasters_Menu'],
            },
            {
                label: 'Employee Leave Request Advance Setting List',
                icon: 'pi pi-fw pi-cog',
                routerLink: [
                    '/home/timeclockplus/masters/employee-leave-request-advance-setting-list',
                ],
                permission: ['EmployeeLeaveRequestAdvancedSettingMasters_Menu'],
            },
        ],
    },

    // ==================== TRANSACTIONS ====================
    {
        label: 'Transactions',
        icon: 'fas fa-cash-register',
        items: [
            {
                label: 'Timesheet Express',
                icon: 'pi pi-fw pi-calendar-plus',
                routerLink: [
                    '/home/timeclockplus/transactions/timesheet-express/fromDateTime/${fromDateTime}/toDateTime/${toDateTime}',
                ],
                permission: ['TimesheetExpressTransactions_Menu'],
            },
            {
                label: 'Leave Grant Job Status',
                icon: 'pi pi-fw pi-question',
                routerLink: [
                    '/home/timeclockplus/transactions/employee-leave-grant-job-status-list',
                ],
                permission: ['LeaveGrantJobStatusTransactions_Menu'],
            },
            {
                label: 'Employee Leave Balance',
                icon: 'pi pi-fw pi-credit-card',
                routerLink: [
                    '/home/timeclockplus/transactions/employee-leave-balance-list',
                ],
                permission: ['EmployeeLeaveBalanceTransactions_Menu'],
            },
            {
                label: 'Employee Leave Request',
                icon: 'pi pi-fw pi-forward',
                routerLink: [
                    '/home/timeclockplus/transactions/employee-leave-request-list',
                ],
                permission: ['EmployeeLeaveRequestTransactions_Menu'],
            },
            {
                label: 'Employee Leave Process Status',
                icon: 'pi pi-fw pi-question-circle',
                routerLink: [
                    '/home/timeclockplus/transactions/leave-process-status-list',
                ],
                permission: ['EmployeeLeaveProcessStatusTransactions_Menu'],
            },
            {
                label: 'Employee Work Assignments',
                icon: 'pi pi-fw pi-briefcase',
                routerLink: [
                    '/home/timeclockplus/transactions/work-assignment-list',
                ],
                permission: 'EmployeeWorkAssignmentTransactions_Menu',
            },
        ],
    },

    // ==================== WORKFLOW ====================
    {
        label: 'Workflow',
        icon: 'fas fa-tasks',
        items: [
            {
                label: 'Timesheet',
                icon: 'pi pi-fw pi-calendar-times',
                items: [
                    {
                        label: 'Manage Timesheet',
                        icon: 'pi pi-fw pi-table',
                        routerLink: [
                            '/home/timeclockplus/workflow/manage-timesheet-workflow',
                        ],
                        permission: 'ManageTimesheetWorkflow_Menu',
                    },
                ],
            },
            {
                label: 'Employee Leave Request Workflow Status',
                icon: 'pi pi-fw pi-ticket',
                routerLink: [
                    '/home/timeclockplus/workflow/employee-leave-request-workflow-status-list',
                ],
                permission: 'EmployeeLeaveRequestStatusWorkflow_Menu',
            },

            {
                label: 'Employee Leave Request Status Update',
                icon: 'pi pi-fw pi-ticket',
                routerLink: [
                    '/home/timeclockplus/workflow/employee-leave-request-status-update',
                ],
                permission: 'EmployeeLeaveRequestStatusUpdateWorkflow_Menu',
            },
        ],
    },

    // ==================== REPORT ====================
    {
        label: 'Report', icon: 'fas fa-file-lines',
        items : [
            {
                label: 'Employee Leave and Workflow Reports',
                icon: 'fas fa-tasks',
                items: [
                    // {
                    //     label: 'Employee Leave Grant',
                    //     icon: 'pi pi-fw pi-step-forward-alt',
                    //     routerLink: [
                    //         '/home/timeclockplus/reports/employee-leave/employee-leave-grant-report',
                    //     ],
                    //     permission: ['EmployeeLeaveGrantReports_Menu'],
                    // },
                    {
                        label: 'Employee Leave Balance',
                        icon: 'pi pi-fw pi-wallet',
                        routerLink: [
                            '/home/timeclockplus/reports/employee-leave/employee-leave-balance-report',
                        ],
                        permission: ['EmployeeLeaveBalanceReports_Menu'],
                    },
                    {
                        label: 'Employee Leave Register',
                        icon: 'pi pi-fw pi-wallet',
                        routerLink: [
                            '/home/timeclockplus/reports/employee-leave/employee-leave-balance-register-report',
                        ],
                        permission: ['EmployeeLeaveRegisterReports_Menu'],
                    },
                    {
                        label: 'Department Leave Summary',
                        icon: 'pi pi-fw pi-wallet',
                        routerLink: [
                            '/home/timeclockplus/reports/employee-leave/department-leave-summary-report',
                        ],
                        permission: ['DepartmentLeaveSummaryReports_Menu'],
                    },
                    {
                        label: 'Employee Daily Leave',
                        icon: 'pi pi-fw pi-wallet',
                        routerLink: ['/home/timeclockplus/reports/employee-leave/daily-leave-report'],
                        permission: ['EmployeeDailyLeaveReports_Menu'],
                    },
                    {
                        label: 'Employee Monthly Leave',
                        icon: 'pi pi-fw pi-wallet',
                        routerLink: [
                            '/home/timeclockplus/reports/employee-leave/monthly-leave-report',
                        ],
                        permission: ['EmployeeMonthlyLeaveReports_Menu'],
                    },
                    {
                        label: 'Employee Pending Leave Approval',
                        icon: 'pi pi-fw pi-wallet',
                        routerLink: [
                            '/home/timeclockplus/reports/employee-leave/pending-leave-approval-report',
                        ],
                        permission: ['EmployeePendingLeaveApprovalReports_Menu'],
                    },
                    {
                        label: 'Employee Leave Without Pay',
                        icon: 'pi pi-fw pi-wallet',
                        routerLink: [
                            '/home/timeclockplus/reports/employee-leave/leave-withoout-pay-report',
                        ],
                        permission: ['EmployeeLeaveWithoutPayReports_Menu'],
                    },
                    {
                        label: 'Employee Leave Encashment',
                        icon: 'pi pi-fw pi-wallet',
                        routerLink: [
                            '/home/timeclockplus/reports/employee-leave/leave-encashment-report',
                        ],
                        permission: ['EmployeeLeaveEncashmentReports_Menu'],
                    },
                    {
                        label: 'Employee Attendance Vs Leave',
                        icon: 'pi pi-fw pi-wallet',
                        routerLink: [
                            '/home/timeclockplus/reports/employee-leave/attendance-vs-leave-report',
                        ],
                        permission: ['EmployeeAttendanceVsLeaveReports_Menu'],
                    },
                    {
                        label: 'Employee Leave - Faculty Availability',
                        icon: 'pi pi-fw pi-wallet',
                        routerLink: [
                            '/home/timeclockplus/reports/employee-leave/faculty-availability-report',
                        ],
                        permission: ['EmployeeLeaveFacultyAvailabilityReports_Menu'],
                    },
                    {
                        label: 'Employee Leave Trend',
                        icon: 'pi pi-fw pi-wallet',
                        routerLink: ['/home/timeclockplus/reports/employee-leave/leave-trend-report'],
                        permission: ['EmployeeLeaveTrendReports_Menu'],
                    },
                    {
                        label: 'Employee Leave Type Utilization',
                        icon: 'pi pi-fw pi-wallet',
                        routerLink: [
                            '/home/timeclockplus/reports/employee-leave/leave-type-utilization-report',
                        ],
                        permission: ['EmployeeLeaveTypeUtilizationReports_Menu'],
                    },
                    {
                        label: 'Employee Leave Liability Report',
                        icon: 'pi pi-fw pi-wallet',
                        routerLink: [
                            '/home/timeclockplus/reports/employee-leave/leave-liability-report',
                        ],
                        // permission: ['EmployeeLeaveLiabilityReports_Menu'],
                    },
                    {
                        label: 'Employee Leave Audit Report',
                        icon: 'pi pi-fw pi-wallet',
                        routerLink: [
                            '/home/timeclockplus/reports/employee-leave/leave-audit-report',
                        ],
                        // permission: ['EmployeeLeaveAuditeports_Menu'],
                    },
                    {
                        label: 'Employee Holiday Leave Clash Report',
                        icon: 'pi pi-fw pi-wallet',
                        routerLink: [
                            '/home/timeclockplus/reports/employee-leave/holiday-leave-clash-report',
                        ],
                        // permission: ['EmployeeHolidayLeaveClashReports_Menu'],
                    }
                ]
            }
        ]
    },
];
