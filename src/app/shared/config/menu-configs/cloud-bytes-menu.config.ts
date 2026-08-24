import { PermissionMenuItem } from 'src/app/shared/models/commons/permission-menu-item.model';

export const CLOUDBYTES_MENU: PermissionMenuItem[] = [
    { label: 'Dashboard', icon: 'fas fa-house-user', routerLink: ['/home/cloudbytes/dashboard'] },

    // ==================== MASTERS ====================
    {
        label: 'Masters', icon: 'fas fa-database', badgeStyleClass: 'text-badge',
        items: [
            // ==================== COMPANY ====================
            {
                label: 'Company', icon: 'fas fa-building', badgeStyleClass: 'text-badge',
                items: [
                    {
                        label: 'Partner', icon: 'pi pi-fw pi-users', badgeStyleClass: 'text-badge',
                        items: [
                            { label: 'Partner', icon: 'pi pi-fw pi-user', routerLink: ['/home/cloudbytes/company/partner/partner-view'], permission: 'PartnerMasters_Menu' },
                            { label: 'Partner Image', icon: 'pi pi-fw pi-images', routerLink: ['/home/cloudbytes/company/partner/partner-image-list'], permission: 'PartnerImageMasters_Menu' },
                            { label: 'Partner ImageType', icon: 'pi pi-fw pi-file', routerLink: ['/home/cloudbytes/company/partner/partner-image-type-list'], permission: 'PartnerImageTypeMasters_Menu' },
                            { label: 'Contact Category', icon: 'pi pi-fw pi-bars', routerLink: ['/home/cloudbytes/company/partner/partner-contact-category-list'], permission: 'PartnerContactCategoryMasters_Menu' },
                            { label: 'Contact Number', icon: 'pi pi-fw pi-book', routerLink: ['/home/cloudbytes/company/partner/partner-contact-number-list'], permission: 'PartnerContactNumberMasters_Menu' },
                        ]
                    },
                    { label: 'Organizational Holidays', icon: 'pi pi-fw pi-sun', routerLink: ['/home/cloudbytes/company/organizational-holidays-list'], permission: 'OrganizationalHolidayMasters_Menu' },
                ]
            },

            {
                label: 'Academics', icon: 'pi pi-fw pi-book', badgeStyleClass: 'text-badge',
                items: [
                    { label: 'Academic Session', icon: 'pi pi-fw pi-clock', routerLink: ['/home/cloudbytes/masters/academics/academics-session-list'], permission: 'AcademicSessionMasters_Menu' },
                    { label: 'Faculty', icon: 'pi pi-fw pi-user', routerLink: ['/home/cloudbytes/masters/academics/faculty-list'], permission: 'FacultyMasters_Menu' },
                    { label: 'Department', icon: 'pi pi-fw pi-briefcase', routerLink: ['/home/cloudbytes/masters/academics/department-list'], permission: 'FacultyDepartmentMasters_Menu' },
                    { label: 'Degree Type', icon: 'pi pi-fw pi-id-card', routerLink: ['/home/cloudbytes/masters/academics/degree-type-list'], permission: 'DegreeTypeMasters_Menu' },
                    { label: 'Degree', icon: 'pi pi-fw pi-tablet', routerLink: ['/home/cloudbytes/masters/academics/degree-list'], permission: 'DegreeMasters_Menu' },
                    { label: 'Program', icon: 'pi pi-fw pi-calendar', routerLink: ['/home/cloudbytes/masters/academics/program-list'], permission: 'ProgramMasters_Menu' },
                    { label: 'Operational Vertical', icon: 'pi pi-fw pi-calendar-times', routerLink: ['/home/cloudbytes/masters/academics/operational-vertical-list'], permission: 'OperationalVerticalMasters_Menu' },
                    { label: 'Program Specialization', icon: 'pi pi-fw pi-star', routerLink: ['/home/cloudbytes/masters/academics/program-specialization-list'], permission: 'ProgramSpecializationMasters_Menu' },
                ]
            },
            {
                label: 'Subjects', icon: 'pi pi-fw pi-bookmark', badgeStyleClass: 'text-badge',
                items: [
                    { label: 'PaperType', icon: 'pi pi-fw pi-file', routerLink: ['/home/cloudbytes/masters/subjects/paper-type-list'], permission: 'PaperTypeMasters_Menu' },
                    { label: 'SubjectType', icon: 'pi pi-fw pi-tags', routerLink: ['/home/cloudbytes/masters/subjects/subject-type-list'], permission: 'SubjectTypeMasters_Menu' },
                    { label: 'Subject', icon: 'pi pi-fw pi-bookmark', routerLink: ['/home/cloudbytes/masters/subjects/subject-list'], permission: 'SubjectMasters_Menu' },
                    { label: 'Subject Paper Code', icon: 'pi pi-fw pi-key', routerLink: ['/home/cloudbytes/masters/subjects/subject-paper-code-list'], permission: 'SubjectPaperCodeMasters_Menu' },
                    { label: 'Sub Module', icon: 'pi pi-fw pi-cog', routerLink: ['/home/cloudbytes/masters/subjects/paper-code-sub-module-manage'], permission: 'SubjectPaperCodeModuleSubModuleMasters_Menu' }
                ]
            },
            {
                label: 'Accounts', icon: 'pi pi-fw pi-credit-card',
                items: [
                    { label: 'Fee Components', icon: 'pi pi-fw pi-money-bill', routerLink: ['/home/cloudbytes/masters/accounts/fee-component-list'], permission: 'FeeComponentMasters_Menu' },
                    { label: 'Concession Category', icon: 'pi pi-fw pi-tags', routerLink: ['/home/cloudbytes/masters/accounts/concession-category-list'], permission: 'ConcessionCategoryMasters_Menu' },
                ]
            },
            {
                label: 'Services', icon: 'pi pi-fw pi-th-large',
                items: [
                    {
                        label: 'Service Request', icon: 'pi pi-fw pi-slack',
                        items: [
                            { label: 'Department', icon: 'pi pi-fw pi-ticket', routerLink: ['/home/cloudbytes/masters/service-request/department-list'], permission: 'ServiceRequestDepartmentMasters_Menu' },
                            { label: 'Workgroup', icon: 'pi pi-fw pi-wallet', routerLink: ['/home/cloudbytes/masters/service-request/workgroup-list'], permission: 'ServiceRequestWorkgroupMasters_Menu' },
                            { label: 'Category', icon: 'pi pi-fw pi-window-maximize', routerLink: ['/home/cloudbytes/masters/service-request/category-list'], permission: 'ServiceRequestCategoryMasters_Menu' },
                            { label: 'Sub Category', icon: 'pi pi-fw pi-th-large', routerLink: ['/home/cloudbytes/masters/service-request/sub-category-list'], permission: 'ServiceRequestSubCategoryMasters_Menu' },
                            { label: 'Service Request Mapping', icon: 'pi pi-fw pi-table', routerLink: ['/home/cloudbytes/masters/service-request/mapping-list'], permission: 'ServiceRequestMappingMasters_Menu' },
                        ]
                    }
                ]
            },
            {
                label: 'HR', icon: 'pi pi-fw pi-tablet',
                items: [
                    { label: 'Religion', icon: 'pi pi-fw pi-hashtag', routerLink: ['/home/cloudbytes/masters/hr/religion-list'], permission: 'ReligionMasters_Menu' },
                    { label: 'Caste', icon: 'pi pi-fw pi-tags', routerLink: ['/home/cloudbytes/masters/hr/caste-list'], permission: 'CasteMasters_Menu' },
                    { label: 'Department', icon: 'pi pi-fw pi-building', routerLink: ['/home/cloudbytes/masters/hr/department-list'], permission: 'DepartmentMasters_Menu' },
                    { label: 'Designation', icon: 'pi pi-fw pi-briefcase', routerLink: ['/home/cloudbytes/masters/hr/designation-list'], permission: 'DesignationMasters_Menu' },
                    { label: 'Identity Type', icon: 'pi pi-fw pi-id-card', routerLink: ['/home/cloudbytes/masters/hr/identity-type-list'], permission: 'IdentityTypeMasters_Menu' },
                ]
            },
            {
                label: 'Infrastructure', icon: 'pi pi-fw pi-building',
                items: [
                    { label: 'Building', icon: 'pi pi-fw pi-building', routerLink: ['/home/cloudbytes/masters/infrastructure/building-list'], permission: 'BuildingMasters_Menu' },
                    { label: 'Room', icon: 'pi pi-fw pi-home', routerLink: ['/home/cloudbytes/masters/infrastructure/room-list'], permission: 'RoomMasters_Menu' },
                ]
            },
            {
                label: 'Students', icon: 'pi pi-fw pi-users', badgeStyleClass: 'text-badge',
                items: [
                    { label: 'Student Status', icon: 'pi pi-fw pi-check-square', routerLink: ['/home/cloudbytes/masters/student/student-status-description-list'], permission: 'StudentStatusDescriptionMasters_Menu' }
                ]
            },
            { label: 'Academics Holidays', icon: 'pi pi-fw pi-sun', routerLink: ['/home/cloudbytes/masters/academic-holidays-list'], permission: 'AcademicHolidayMasters_Menu' }
        ]
    },

    // ==================== TRANSACTIONS ====================
    {
        label: 'Transactions', icon: 'fas fa-cash-register', badgeStyleClass: 'text-badge',
        items: [
            {
                label: 'Academics', icon: 'pi pi-fw pi-book',
                items: [
                    { label: 'Academic Session Program', icon: 'pi pi-fw pi-table', routerLink: ['/home/cloudbytes/transactions/academics/academic-session-program-list'], permission: 'AcademicSessionProgramTransactions_Menu' },
                    { label: 'Program Elective Subject', icon: 'pi pi-fw pi-book', routerLink: ['/home/cloudbytes/transactions/academics/program-elective-subject-list'], permission: 'ProgramElectiveSubjectTransactions_Menu' },
                    { label: 'OVSubject', icon: 'pi pi-fw pi-share-alt', routerLink: ['/home/cloudbytes/transactions/academics/operational-vertical-subject-list'], permission: 'OperationalVerticalSubjectTransactions_Menu' },
                    { label: 'OVSubjectImport', icon: 'pi pi-fw pi-clone', routerLink: ['/home/cloudbytes/transactions/academics/operational-vertical-subject-import'], permission: 'OperationalVerticalSubjectImportTransactions_Menu' },
                    { label: 'OVS Configuration', icon: 'pi pi-fw pi-share-alt', routerLink: ['/home/cloudbytes/transactions/academics/operational-vertical-subject-configuration-list'], permission: 'OperationalVerticalSubjectConfigurationTransactions_Menu' },
                    { label: 'OVS Configuration import', icon: 'pi pi-fw pi-share-alt', routerLink: ['/home/cloudbytes/transactions/academics/operational-vertical-subject-configuration-import'], permission: 'OperationalVerticalSubjectConfigurationImportTransactions_Menu' }
                ]
            },
            {
                label: 'Accounts', icon: 'pi pi-fw pi-credit-card',
                items: [
                    { label: 'OV Fee', icon: 'pi pi-fw pi-money-bill', routerLink: ['/home/cloudbytes/transactions/accounts/operational-vertical-fee-component-list'], permission: 'OperationalVerticalFeeComponentTransactions_Menu' },
                    { label: 'OV Fee Component Import ', icon: 'pi pi-fw pi-money-bill', routerLink: ['/home/cloudbytes/transactions/accounts/operational-vertical-fee-component-import-manage'], permission: 'OperationalVerticalFeeComponentImportTransactions_Menu' },
                    { label: 'Concession Fee', icon: 'pi pi-fw pi-money-bill', routerLink: ['/home/cloudbytes/transactions/accounts/concession-fee-setup-list'], permission: 'ConcessionFeeSetupTransactions_Menu' }
                ]
            },
        ]
    }
];