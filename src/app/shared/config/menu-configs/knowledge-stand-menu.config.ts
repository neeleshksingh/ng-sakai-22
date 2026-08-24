import { PermissionMenuItem } from 'src/app/shared/models/commons/permission-menu-item.model';

export const KNOWLEDGE_STAND_MENU: PermissionMenuItem[] = [
    { label: 'Dashboard', icon: 'fas fa-home-user', routerLink: ['/home/knowledgestand/dashboard'] },

    // ==================== MASTERS ====================
    {
        label: 'Masters',
        icon: 'fas fa-database',
        items: [
            { label: 'Examination Types', icon: 'pi pi-fw pi-th-large', routerLink: ['/home/knowledgestand/masters/examination-type-list'], permission: 'ExaminationTypeMasters_Menu' },
            { label: 'Assessment Types', icon: 'pi pi-fw pi-sitemap', routerLink: ['/home/knowledgestand/masters/assessment-type-list'], permission: 'AssessmentTypeMasters_Menu' },
            { label: 'Assessment Components', icon: 'pi pi-fw pi-list', routerLink: ['/home/knowledgestand/masters/assessment-component-list'], permission: 'AssessmentComponentMasters_Menu' },
            { label: 'Examinations', icon: 'pi pi-fw pi-file', routerLink: ['/home/knowledgestand/masters/examination-list'], permission: 'ExaminationMasters_Menu' },
            { label: 'Examination Programs', icon: 'pi pi-fw pi-briefcase', routerLink: ['/home/knowledgestand/masters/examination-program-list'], permission: 'ExaminationProgramMasters_Menu' },
            { label: 'Examination Program Configurations', icon: 'pi pi-fw pi-sliders-h', routerLink: ['/home/knowledgestand/masters/examination-program-configuration-list'], permission: 'ExaminationProgramConfigurationMasters_Menu' },
            { label: 'Examination Assessment Component Configurations', icon: 'pi pi-fw pi-cog', routerLink: ['/home/knowledgestand/masters/examination-assessment-configurations'], permission: 'PaperTypeAssessmentConfigurationMasters_Menu' },
            { label: 'Examination Assessment Component Configurations - Programs', icon: 'pi pi-fw pi-cog', routerLink: ['/home/knowledgestand/masters/program-paper-type-assessment-configuration-list'], permission: 'PaperTypeAssessmentConfigurationMasters_Menu' },
            { label: 'Examination Grading System', icon: 'pi pi-fw pi-star', routerLink: ['/home/knowledgestand/masters/examination-grading-system-list'], permission: 'ExaminationGradingMasters_Menu' },
            { label: 'Examination Grading System - Import', icon: 'pi pi-fw pi-star', routerLink: ['/home/knowledgestand/masters/examination-grading-system-import'], permission: 'ExaminationGradingMasters_Menu' },
        ]
    },

    // ==================== TRANSACTIONS ====================
    {
        label: 'Transactions',
        icon: 'fas fa-cash-register',
        items: [
            {
                label: 'Students',
                icon: 'pi pi-fw pi-users',
                items: [
                    { label: 'Student Images', icon: 'pi pi-fw pi-image', routerLink: ['/home/knowledgestand/transactions/students/student-images'], permission: 'StudentImageTransactions_Menu' },
                    { label: 'Student Program Promotions', icon: 'pi pi-fw pi-user-edit', routerLink: ['/home/knowledgestand/transactions/students/student-program-promotion'], permission: 'StudentPromotionTransactions_Menu' },
                    {
                        label: 'Certificates',
                        icon: 'pi pi-fw pi-file',
                        permission: 'StudentCertificateTransactions_Menu',
                        items: [
                            { label: 'Student Certificates', icon: 'pi pi-fw pi-copy', routerLink: ['/home/knowledgestand/transactions/students/certificates/student-certificates'], permission: 'StudentCertificateTransactions_Menu' },
                            { label: 'Provisional Certificate', icon: 'pi pi-fw pi-external-link', routerLink: ['/home/knowledgestand/transactions/students/certificates/student-provisional-certificates'], permission: 'StudentProvisionalCertificateTransactions_Menu' },
                            { label: 'Migration Certificate', icon: 'pi pi-fw pi-external-link', routerLink: ['/home/knowledgestand/transactions/students/certificates/student-migration-certificates'], permission: 'StudentMigrationCertificateTransactions_Menu' },
                            { label: 'Transfer Certificate', icon: 'pi pi-fw pi-external-link', routerLink: ['/home/knowledgestand/transactions/students/certificates/student-transfer-certificates'], permission: 'StudentTransferCertificateTransactions_Menu' },
                            { label: 'Student Certificates V2', icon: 'pi pi-fw pi-copy', routerLink: ['/home/knowledgestand/transactions/students/certificates/student-certificates-v2'], permission: 'StudentCertificateTransactions_Menu' },
                            { label: 'Migration Certificate V2', icon: 'pi pi-fw pi-external-link', routerLink: ['/home/knowledgestand/transactions/students/certificates/student-migration-certificates-v2'], permission: 'StudentMigrationCertificateTransactions_Menu' },
                            { label: 'Provisional Certificate V2', icon: 'pi pi-fw pi-external-link', routerLink: ['/home/knowledgestand/transactions/students/certificates/student-provisional-certificates-v2'], permission: 'StudentProvisionalCertificateTransactions_Menu' },
                            { label: 'Transfer Certificate V2', icon: 'pi pi-fw pi-external-link', routerLink: ['/home/knowledgestand/transactions/students/certificates/student-transfer-certificates-v2'], permission: 'StudentTransferCertificateTransactions_Menu' },
                        ]
                    },
                    { label: 'Student Academics Transcript', icon: 'pi pi-fw pi-file-pdf', routerLink: ['/home/knowledgestand/transactions/tabular-report/student-academics-transcript'], permission: 'AcademicTranscriptTransactions_Menu' },
                ]
            },
            {
                label: 'Examination Registration',
                icon: 'pi pi-fw pi-external-link',
                permission: 'StudentExaminationRegistrationTransactions_Menu',
                items: [
                    { label: 'By Student', icon: 'pi pi-fw pi-user-plus', routerLink: ['/home/knowledgestand/transactions/examination-registration/student-examination-registration/by-student'], permission: 'StudentExaminationRegistrationByStudentTransactions_Menu' },
                    { label: 'By Bulk', icon: 'pi pi-fw pi-clone', routerLink: ['/home/knowledgestand/transactions/examination-registration/student-examination-registration/by-bulk'], permission: 'StudentExaminationRegistrationByBulkTransactions_Menu' },
                ]
            },
            { label: 'Student External Examination Credit Transfer', icon: 'pi pi-fw pi-arrow-right-arrow-left', routerLink: ['/home/knowledgestand/transactions/student-external-examination-credit-transfer-list'], permission: 'StudentExternalExaminationCreditTransferTransactions_Menu' },
            { label: 'Seating Arrangement', icon: 'pi pi-fw pi-table', routerLink: ['/home/knowledgestand/transactions/examination-seating-arrangement/examination-seating-arrangement-manage'], permission: 'ExaminationSeatingArrangementTransactions_Menu' },

            {
                label: 'Room Booklet',
                icon: 'pi pi-fw pi-book',
                items: [
                    { label: 'Distribution', icon: 'pi pi-fw pi-download', routerLink: ['/home/knowledgestand/transactions/room-booklet/distribution'], permission: 'RoomBookletDistributionTransactions_Menu' },
                    { label: 'Return Booklet', icon: 'pi pi-fw pi-upload', routerLink: ['/home/knowledgestand/transactions/room-booklet/return'], permission: 'RoomBookletReturnTransactions_Menu' },
                ]
            },

            { label: 'Invigilator Assignment', icon: 'pi pi-fw pi-tags', routerLink: ['/home/knowledgestand/transactions/invigilator-assignment-list'], permission: 'InvigilatorAssignmentTransactions_Menu' },

            {
                label: 'Attendance',
                icon: 'pi pi-fw pi-check-circle',
                permission: 'ExaminationAttendanceTransactions_Menu',
                items: [
                    { label: 'Attendance- Batch Code', icon: 'pi pi-fw pi-bars', routerLink: ['/home/knowledgestand/transactions/attendance/batch-code-wise'], permission: 'ExaminationAttendanceBatchCodeTransactions_Menu' },
                    // { label: 'Attendance- Room Wise', icon: 'pi pi-fw pi-th-large', routerLink: ['/home/knowledgestand/transactions/attendance/room-wise'] },
                    { label: 'Attendance- Subject Paper Code', icon: 'pi pi-fw pi-list', routerLink: ['/home/knowledgestand/transactions/attendance/paper-code-wise'], permission: 'ExaminationAttendanceSubjectPaperCodeTransactions_Menu' }
                ]
            },

            {
                label: 'Booklet Evaluation',
                icon: 'pi pi-fw pi-bookmark',
                items: [
                    { label: 'Booklet Assignment', icon: 'pi pi-fw pi-send', routerLink: ['/home/knowledgestand/transactions/booklet-evaluation/booklet-assignment'], permission: 'ExaminationBookletAssignmentTransactions_Menu' },
                    { label: 'Return Booklet', icon: 'pi pi-fw pi-inbox', routerLink: ['/home/knowledgestand/transactions/booklet-evaluation/return-booklet'], permission: 'ExaminationReturnBookletTransactions_Menu' },
                    { label: 'Re-Issue Booklet', icon: 'pi pi-fw pi-sync', routerLink: ['/home/knowledgestand/transactions/booklet-evaluation/re-issue-booklet'], permission: 'ExaminationReIssueBookletTransactions_Menu' },
                ]
            },

            {
                label: 'Marks Entry',
                icon: 'pi pi-fw pi-check-square',
                items: [
                    { label: 'Marks Entry- Batch Code', icon: 'pi pi-fw pi-pencil', routerLink: ['/home/knowledgestand/transactions/marks-entry/batch-code-wise'], permission: 'ExaminationMarksEntryBatchCodeTransactions_Menu' },
                    { label: 'Marks Entry- Section', icon: 'pi pi-fw pi-tags', routerLink: ['/home/knowledgestand/transactions/marks-entry/section-wise'], permission: 'ExaminationMarksEntrySectionTransactions_Menu' },
                    { label: 'Marks Entry- Room Allocation', icon: 'pi pi-fw pi-file-edit', routerLink: ['/home/knowledgestand/transactions/marks-entry/normal-flow-room-allocation'], permission: 'ExaminationMarksEntryRoomAllocationTransactions_Menu' },
                    { label: 'Marks Entry- Subject Paper Code', icon: 'pi pi-fw pi-list', routerLink: ['/home/knowledgestand/transactions/marks-entry/subject-paper-code'], permission: 'ExaminationMarksEntrySubjectPaperCodeTransactions_Menu' },
                    { label: 'Marks Entry- Back Support (VIEW ONLY)', icon: 'pi pi-fw pi-eye', routerLink: ['/home/knowledgestand/transactions/marks-entry/back-support'], permission: 'ExaminationMarksEntryBackSupportTransactions_Menu' },
                    { label: 'Marks Entry- Scrutiny', icon: 'pi pi-fw pi-search', routerLink: ['/home/knowledgestand/transactions/marks-entry/scrutiny'], permission: 'ExaminationMarksEntryScrutinyTransactions_Menu' },
                    { label: 'Marks Entry- Lock/Unlock', icon: 'pi pi-fw pi-lock-open', routerLink: ['/home/knowledgestand/transactions/marks-entry/lock-unlock'], permission: 'ExaminationMarksEntryLockUnlockTransactions_Menu' },
                ]
            },

            {
                label: 'Tabular Report',
                icon: 'pi pi-fw pi-table',
                permission: 'TabularReportTransactions_Menu',
                items: [
                    { label: 'Regular TR', icon: 'pi pi-fw pi-table', routerLink: ['/home/knowledgestand/transactions/tabular-report/regular-tr'], permission: 'TabularReportRegularTransactions_Menu' },
                    { label: 'Backlog TR', icon: 'pi pi-fw pi-history', routerLink: ['/home/knowledgestand/transactions/tabular-report/backlog-tr'], permission: 'TabularReportBacklogTransactions_Menu' },
                    { label: 'TR Job Request', icon: 'pi pi-fw pi-briefcase', routerLink: ['/home/knowledgestand/transactions/tabular-report/tr-job-request-list'], permission: 'TabularReportJobRequestTransactions_Menu' },
                    { label: 'TR Process Job Request', icon: 'pi pi-fw pi-cog', routerLink: ['/home/knowledgestand/transactions/tabular-report/tr-process-job'], permission: 'TabularReportProcessJobRequestTransactions_Menu' },
                ]
            },

            {
                label: 'Manage Result',
                icon: 'pi pi-fw pi-file',
                permission: ['ExaminationResultPublishTransactions_Menu', 'ExaminationResultHoldTransactions_Menu'],
                items: [
                    { label: 'Publish Result', icon: 'pi pi-fw pi-upload', routerLink: ['/home/knowledgestand/transactions/publish-result'], permission: 'ExaminationResultPublishTransactions_Menu' },
                    { label: 'Result Hold', icon: 'pi pi-fw pi-pause', routerLink: ['/home/knowledgestand/transactions/result-hold-list'], permission: 'ExaminationResultHoldTransactions_Menu' },
                ]
            },
        ]
    },


    // ==================== REPORTS ====================
    {
        label: 'Reports',
        icon: 'fas fa-file-lines',
        items: [
            {
                label: 'Students',
                icon: 'pi pi-fw pi-user',
                items: [
                    { label: 'Student Information Center', icon: 'pi pi-fw pi-info-circle', routerLink: ['/home/knowledgestand/reports/students/student-information-center'], permission: 'StudentInformationCenter_Menu' },
                    { label: 'Admit Card', icon: 'pi pi-fw pi-id-card', routerLink: ['/home/knowledgestand/reports/students/download-examination-hall-ticket'], permission: 'ExaminationHallTicketReports_Menu' },
                    { label: 'Student Grade Report', icon: 'pi pi-fw pi-file-pdf', routerLink: ['/home/knowledgestand/reports/students/view-result'], permission: 'StudentGradeReports_Menu' },
                    // { label: 'Student Grade Report - v2.0', icon: 'pi pi-fw pi-eye', routerLink: ['/home/knowledgestand/reports/students/view-result-v2'], permission: 'StudentGradeReports_Menu' },
                    { label: 'Academic Transcript Report', icon: 'pi pi-fw pi-file-pdf', routerLink: ['/home/knowledgestand/reports/examinations/student-academics-transcript-report'], permission: 'AcademicTranscriptReports_Menu' },
                    { label: 'Academic Transcript Report - Program Wise', icon: 'pi pi-fw pi-download', routerLink: ['/home/knowledgestand/transactions/tabular-report/student-transcript-download'], permission: 'AcademicTranscriptProgramWiseReports_Menu' },
                    {
                        label: 'Student Certificates', icon: 'pi pi-fw pi-copy', routerLink: ['/home/knowledgestand/reports/students/student-certificates'], permission: 'StudentCertificateReports_Menu'
                    }
                ]
            },
            {
                label: 'Marks Entry',
                icon: 'pi pi-fw pi-pencil',
                items: [
                    { label: 'Marks Entry - Batch Code', icon: 'pi pi-fw pi-tag', routerLink: ['/home/knowledgestand/reports/marks-entry/marks-entry-batch-code'], permission: 'ExaminationMarksEntryBatchCodeReports_Menu' },
                    { label: 'Marks Entry - Section Wise', icon: 'pi pi-fw pi-tag', routerLink: ['/home/knowledgestand/reports/marks-entry/marks-entry-section'], permission: 'ExaminationMarksEntrySectionReports_Menu' },
                    { label: 'Marks Entry - Subject Paper Code', icon: 'pi pi-fw pi-tag', routerLink: ['/home/knowledgestand/reports/marks-entry/marks-entry-subject-paper-code'], permission: 'ExaminationMarksEntrySubjectPaperCodeReports_Menu' },
                    { label: 'Marks Entry - Consolidated', icon: 'pi pi-fw pi-table', routerLink: ['/home/knowledgestand/reports/marks-entry/marks-entry-consolidated'], permission: 'ExaminationMarksEntryConsolidatedReports_Menu' },
                    { label: 'Lock Unlock Status', icon: 'pi pi-fw pi-lock', routerLink: ['/home/knowledgestand/reports/marks-entry/marks-entry-lock-unlock'], permission: 'ExaminationMarksEntryLockUnlockReports_Menu' },
                    { label: 'Marks Entry Pending', icon: 'pi pi-fw pi-book', routerLink: ['/home/knowledgestand/reports/marks-entry/marks-entry-pending-report'], permission: 'ExaminationMarksEntryPendingReports_Menu' }
                ]
            },
            {
                label: 'Decode System',
                icon: 'pi pi-fw pi-cog',
                items: [
                    { label: 'Decode System Print', icon: 'pi pi-fw pi-print', routerLink: ['/home/knowledgestand/reports/decode-system/examination-decode-print'], permission: 'DecodeSystemReports_Menu' }
                ]
            },
            {
                label: 'Tabular Report',
                icon: 'pi pi-fw pi-table',
                // permission: 'TabularReports_Menu',
                items: [
                    { label: 'Tabular Report', icon: 'pi pi-fw pi-table', routerLink: ['/home/knowledgestand/reports/tabular-report/examination-tr'], permission: 'TabularReportReports_Menu' },
                    { label: 'Tabular Report List', icon: 'pi pi-fw pi-file', routerLink: ['/home/knowledgestand/reports/tabular-report/examination-tr-sheet'], permission: 'TabularReportListReports_Menu' },
                    { label: 'Tabular Report Job - Status', icon: 'pi pi-fw pi-chart-line', routerLink: ['/home/knowledgestand/reports/tabular-report/examination-tr-job-status'], permission: 'TabularReportJobStatusReports_Menu' },
                ]
            },
            {
                label: 'Examinations',
                icon: 'pi pi-fw pi-calendar',
                items: [
                    { label: 'Student Program', icon: 'pi pi-fw pi-book', routerLink: ['/home/knowledgestand/reports/students/student-program'], permission: 'StudentProgramReports_Menu' },
                    { label: 'Student ABC Data', icon: 'pi pi-fw pi-info-circle', routerLink: ['/home/knowledgestand/reports/students/student-abc-data'], permission: 'ABCReports_Menu' },
                    { label: 'Student Master Sheet', icon: 'pi pi-fw pi-info-circle', routerLink: ['/home/knowledgestand/reports/students/student-master-sheet'], permission: 'StudentMasterSheetReports_Menu' },
                    { label: 'Examination Registrations', icon: 'pi pi-fw pi-calendar', routerLink: ['/home/knowledgestand/reports/students/student-examination-registration-report'], permission: 'StudentExaminationRegistrationReports_Menu' },
                    { label: 'Examination Scrutiny Application', icon: 'pi pi-fw pi-check-circle', routerLink: ['/home/knowledgestand/reports/examinations/examination-scrutiny-application-report'], permission: 'ExaminationScrutinyApplicationReports_Menu' },
                    { label: 'Backlog / Supplementary Application', icon: 'pi pi-fw pi-briefcase', routerLink: ['/home/knowledgestand/reports/examinations/backlog-application-report'], permission: 'BacklogApplicationReports_Menu' },
                    { label: 'Academics Report', icon: 'pi pi-fw pi-file', routerLink: ['/home/knowledgestand/reports/students/student-academics-report'], permission: 'StudentAcademicsReportReports_Menu' },
                    { label: 'Examination Attendance Batch Wise Report', icon: 'pi pi-fw pi-calendar', routerLink: ['/home/knowledgestand/reports/examinations/attendance-batchwise-report'], permission: 'ExaminationAttendanceBatchWiseReports_Menu' },
                    { label: 'Student Consolidated Marks Statement', icon: 'pi pi-fw pi-file', routerLink: ['/home/knowledgestand/reports/examinations/student-consolidated-marks-statement'], permission: 'StudentConsolidatedMarksStatementReports_Menu' },
                    { label: 'Exam Result Analysis', icon: 'pi pi-fw pi-calendar', routerLink: ['/home/knowledgestand/reports/students/exam-result-analysis'], permission: 'ExamResultAnalysisReports_Menu' },
                    { label: 'Topper List', icon: 'pi pi-fw pi-hashtag', routerLink: ['/home/knowledgestand/reports/students/topper-list'], permission: 'StudentTopperListReports_Menu' },
                ]
            },
            {
                label: 'Accounts',
                icon: 'pi pi-fw pi-dollar',
                items: [
                    { label: 'Defaulters Result Publish Status', icon: 'pi pi-fw pi-exclamation-circle', routerLink: ['/home/knowledgestand/reports/accounts/defaulters-result-publish-status'], permission: 'DefaultersResultPublishStatusReports_Menu' }
                ]
            },
            { label: 'Document Center', icon: 'pi pi-fw pi-folder', routerLink: ['/home/knowledgestand/reports/document-center'], permission: 'DocumentCenterReports_Menu' },

        ]
    }
];