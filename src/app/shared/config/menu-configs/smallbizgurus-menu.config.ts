import { PermissionMenuItem } from 'src/app/shared/models/commons/permission-menu-item.model';

export const SMALLBIZGURUS_MENU: PermissionMenuItem[] = [
    {
        label: 'Dashboard',
        icon: 'fas fa-house-user',
        routerLink: ['/home/smallbizgurus/dashboard'],
    },

    // ==================== MASTERS ====================
    {
        label: 'Masters', icon: 'fas fa-database', badgeStyleClass: 'text-badge',
        items: [
            // ==================== PAYROLL ====================
            {
                label: 'Payroll',
                icon: 'fas fa-money-bill',
                items: [
                    {
                        label: 'Earning Component',
                        icon: 'pi pi-fw pi-chart-line',
                        routerLink: [
                            '/home/smallbizgurus/payroll/earning-component-list',
                        ],
                        permission: 'EarningComponentMasters_Menu',
                    },
                    {
                        label: 'Deduction Component',
                        icon: 'pi pi-fw pi-minus-circle',
                        routerLink: [
                            '/home/smallbizgurus/payroll/deduction-component-list',
                        ],
                        permission: 'DeductionComponentMasters_Menu',
                    },
                    {
                        label: 'Payroll Period',
                        icon: 'pi pi-fw pi-history',
                        routerLink: ['/home/smallbizgurus/payroll/payroll-period-list'],
                        permission: 'PayrollPeriodMasters_Menu',
                    },
                    {
                        label: 'Salary Structure',
                        icon: 'pi pi-fw pi-ticket',
                        routerLink: [
                            '/home/smallbizgurus/payroll/salary-structure-list',
                        ],
                        permission: 'SalaryStructureMasters_Menu',
                    },
                    {
                        label: 'Salary Structure Salary Component Mapping',
                        icon: 'pi pi-fw pi-sitemap',
                        routerLink: [
                            '/home/smallbizgurus/payroll/salary-structure-salary-component-mapping-list',
                        ],
                        permission: 'SalaryStructureSalaryComponentMappingMasters_Menu',
                    },
                    {
                        label: 'Employee Grade Salary Structure',
                        icon: 'pi pi-fw pi-server',
                        routerLink: [
                            '/home/smallbizgurus/payroll/employee-grade-salary-structure-list',
                        ],
                        permission: 'EmployeeGradeSalaryStructureMasters_Menu',
                    },
                    {
                        label: 'Salary Structure Assignment',
                        icon: 'pi pi-fw pi-link',
                        routerLink: [
                            '/home/smallbizgurus/payroll/salary-structure-assignment-list',
                        ],
                        permission: 'SalaryStructureAssignmentMasters_Menu',
                    },
                    {
                        label: 'Income Tax Slab',
                        icon: 'pi pi-fw pi-shield',
                        routerLink: [
                            '/home/smallbizgurus/payroll/income-tax-slab-list',
                        ],
                        permission: 'IncomeTaxSlabMasters_Menu',
                    },
                    {
                        label: 'Tax Regime',
                        icon: 'pi pi-fw pi-flag',
                        routerLink: ['/home/smallbizgurus/payroll/tax-regime-list'],
                        permission: 'TaxRegimeMasters_Menu',
                    },
                ],
            },
        ]
    },

    // ==================== TRANSACTIONS ====================
    {
        label: 'Transactions',
        icon: 'fas fa-cash-register',
        badgeStyleClass: 'text-badge',
        items: [
            // ==================== RECRUITMENT ====================
            {
                label: 'Recruitment',
                icon: 'fas fa-handshake',
                items: [
                    {
                        label: 'Jobs',
                        icon: 'pi pi-fw pi-briefcase',
                        items: [
                            {
                                label: 'Staffing Plan',
                                icon: 'pi pi-fw pi-shopping-bag',
                                routerLink: [
                                    '/home/smallbizgurus/recruitment/staffing-plan-list',
                                ],
                                permission: 'StaffingPlanTransactions_Menu',
                            },
                            {
                                label: 'Job Opening',
                                icon: 'pi pi-fw pi-plus-circle',
                                routerLink: [
                                    '/home/smallbizgurus/recruitment/job-opening-list',
                                ],
                                permission: 'JobOpeningTransactions_Menu',
                            },
                            {
                                label: 'Job Application',
                                icon: 'pi pi-fw pi-book',
                                routerLink: [
                                    '/home/smallbizgurus/recruitment/job-application-list',
                                ],
                                permission: 'JobApplicationTransactions_Menu',
                            },
                        ],
                    },
                    {
                        label: 'Interviews',
                        icon: 'pi pi-fw pi-check-square',
                        items: [
                            {
                                label: 'Interview Schedule',
                                icon: 'pi pi-fw pi-calendar-times',
                                routerLink: [
                                    '/home/smallbizgurus/recruitment/interview-schedule-list',
                                ],
                                permission: 'InterviewScheduleTransactions_Menu',
                            },
                            {
                                label: 'Interview Rating/Feedback',
                                icon: 'pi pi-fw pi-star',
                                routerLink: [
                                    '/home/smallbizgurus/recruitment/interview-rating',
                                ],
                                permission: 'InterviewRatingTransactions_Menu',
                            },
                        ],
                    },
                    {
                        label: 'Job Offers',
                        icon: 'pi pi-fw pi-heart-fill',
                        items: [
                            {
                                label: 'Job Offer',
                                icon: 'pi pi-fw pi-heart',
                                routerLink: [
                                    '/home/smallbizgurus/recruitment/job-offer-list',
                                ],
                                permission: 'JobOfferTransactions_Menu',
                            },
                            {
                                label: 'Job Term',
                                icon: 'pi pi-fw pi-question-circle',
                                routerLink: [
                                    '/home/smallbizgurus/recruitment/job-term-list',
                                ],
                                permission: 'JobTermTransactions_Menu',
                            },
                            {
                                label: 'Job Offer and Terms',
                                icon: 'pi pi-fw pi-id-card',
                                routerLink: [
                                    '/home/smallbizgurus/recruitment/job-offer-and-terms-list',
                                ],
                                permission: 'JobOfferAndTermsTransactions_Menu',
                            },
                            {
                                label: 'Interview Evaluation',
                                icon: 'pi pi-fw pi-check-circle',
                                routerLink: [
                                    '/home/smallbizgurus/recruitment/interview-evaluation-list',
                                ],
                                permission: 'InterviewEvaluationTransactions_Menu',
                            },
                        ],
                    },
                    {
                        label: 'Employee Background Verification',
                        icon: 'pi pi-fw pi-slack',
                        items: [
                            {
                                label: 'EBC Address',
                                icon: 'pi pi-fw pi-map-marker',
                                routerLink: [
                                    '/home/smallbizgurus/recruitment/ebc-address-list',
                                ],
                                permission: 'EBCApplicantAddressTransactions_Menu',
                            },
                            {
                                label: 'EBC Education',
                                icon: 'pi pi-fw pi-check-square',
                                routerLink: [
                                    '/home/smallbizgurus/recruitment/ebc-education-list',
                                ],
                                permission: 'EBCApplicantEducationHistoryTransactions_Menu',
                            },
                            {
                                label: 'EBC Information',
                                icon: 'pi pi-fw pi-info-circle',
                                routerLink: [
                                    '/home/smallbizgurus/recruitment/ebc-information-list',
                                ],
                                permission: 'EBCApplicantInformationTransactions_Menu',
                            },
                            {
                                label: 'EBC Professional',
                                icon: 'pi pi-fw pi-briefcase',
                                routerLink: [
                                    '/home/smallbizgurus/recruitment/ebc-professional-list',
                                ],
                                permission: 'EBCApplicantProfessionalHistoryTransactions_Menu',
                            },
                        ],
                    },
                ],
            },

            // ==================== EMPLOYEES ====================
            {
                label: 'Employees',
                icon: 'fas fa-circle-user',
                items:
                    [
                        {
                            label: 'Employee Details',
                            icon: 'pi pi-fw pi-info-circle',
                            routerLink: [
                                '/home/smallbizgurus/employees/employee-details',
                            ],
                            permission: 'EmployeeTransactions_Menu',
                        },
                        {
                            label: 'Employee Department Group',
                            icon: 'pi pi-fw pi-users',
                            routerLink: [
                                '/home/smallbizgurus/employees/employee-department-group-list',
                            ],
                            permission: 'EmployeeDepartmentGroupTransactions_Menu',
                        },
                        {
                            label: 'Speciality List',
                            icon: 'pi pi-fw pi-file',
                            routerLink: [
                                '/home/smallbizgurus/employees/speciality-list',
                            ],
                            permission: 'SpecialityTransactions_Menu',
                        },
                        {
                            label: 'Employee Grade',
                            icon: 'pi pi-fw pi-tag',
                            routerLink: [
                                '/home/smallbizgurus/employees/employee-grade-list',
                            ],
                            permission: 'EmployeeGradeTransactions_Menu',
                        },
                        {
                            label: 'Employee Resignation',
                            icon: 'pi pi-fw pi-thumbs-up',
                            routerLink: [
                                '/home/smallbizgurus/employees/employee-resignation',
                            ],
                            permission: 'EmployeeResignationTransactions_Menu',
                        },
                        {
                            label: 'Employee Exit',
                            icon: 'pi pi-fw pi-sign-out',
                            routerLink: [
                                '/home/smallbizgurus/employees/employee-exit',
                            ],
                            permission: 'EmployeeExitTransactions_Menu',
                        },
                    ],
            },

            // ==================== STUDENTS ====================
            {
                label: 'Students',
                icon: 'fas fa-user',
                items: [
                    {
                        label: 'Student Status',
                        icon: 'pi pi-fw pi-chart-line',
                        routerLink: [
                            '/home/smallbizgurus/students/student-status-list',
                        ],
                        permission: 'StudentStatusTransactions_Menu',
                    },
                ],
            },
        ],
    }
];
