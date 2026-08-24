import { PermissionMenuItem } from 'src/app/shared/models/commons/permission-menu-item.model';

export const EXECUTIVEEDGE_MENU: PermissionMenuItem[] = [
    { label: 'Dashboard', icon: 'fas fa-house-user', routerLink: ['/home/executiveedge/dashboard'] },

    {
        label: 'Masters', icon: 'fas fa-database', badgeStyleClass: 'text-badge',
        items: [
            { label: 'Feedback Questions', icon: 'pi pi-comments', routerLink: ['/home/executiveedge/masters/feedback-question-list'], permission: 'FeedbackQuestionMasters_Menu' },
            { label: 'University Document Type', icon: 'pi pi-tags', routerLink: ['/home/executiveedge/masters/university-document-type-list'], permission: 'UniversityDocumentTypeMasters_Menu' },
            { label: 'University Document', icon: 'pi pi-file-edit', routerLink: ['/home/executiveedge/masters/university-document-list'], permission: 'UniversityDocumentMasters_Menu' },
        ]
    },

    {
        label: 'Transactions', icon: 'fas fa-cash-register', badgeStyleClass: 'text-badge',
        items: [
            { label: 'Publish Notice', icon: 'pi pi-megaphone', routerLink: ['/home/executiveedge/transactions/publish-notice-list'], permission: 'PublishNoticeTransactions_Menu' },
            { label: 'Student Publish Notice', icon: 'pi pi-bell', routerLink: ['/home/executiveedge/transactions/student-publish-notice-list'], permission: 'StudentPublishNoticeTransactions_Menu' },
            { label: 'Document Centre', icon: 'pi pi-folder-open', routerLink: ['/home/executiveedge/transactions/document-centre-list'], permission: 'DocumentCentreTransactions_Menu' },
            { label: 'University Document Issued', icon: 'pi pi-verified', routerLink: ['/home/executiveedge/transactions/university-document-issued-list'], permission: 'UniversityDocumentIssuedTransactions_Menu' },
            { label: 'Feedback Announcement', icon: 'pi pi-send', routerLink: ['/home/executiveedge/transactions/feedback-announcement-list'], permission: 'FeedbackAnnouncementTransactions_Menu' },
            { label: 'Faculty Feedback', icon: 'pi pi-star', routerLink: ['/home/executiveedge/transactions/faculty-feedback'], permission: 'OrganisationFeedbackInternalTransactions_Menu' },
        ]
    },

    {
        label: 'Reports', icon: 'fas fa-file-lines', badgeStyleClass: 'text-badge',
        items: [
            { label: 'Batch Faculty Feedback Report', icon: 'pi pi-chart-bar', routerLink: ['/home/executiveedge/reports/batch-faculty-feedback'], permission: 'BatchFacultyFeedbackReports_Menu' },
            { label: 'Organisation Feedback Internal', icon: 'pi pi-chart-line', routerLink: ['/home/executiveedge/reports/organisation-feedback-internal'], permission: 'OrganisationFeedbackInternalReports_Menu' },
        ]
    },
];