import { AuditModel } from "../commons/audit-model";

export class EmployeeExit extends AuditModel {
    id?: number;
    employeeId?: number;
    employeeCode?: string;

    //Initiate resignation
    isResigned?: boolean;
    resignationDateTime?: Date;
    resignationReason?: string;
    hasNoticePeriod?: boolean;
    noticePeriodInDays?: number;
    lastWorkingDate?: Date;
    isImmediateManagerNotification?: boolean;
    isResignationRevoked?: boolean;
    resignationRevokedBy?: string;
    resignationRevokedReason?: string;
    resignationRevokedDateTime?: Date;

    //ResignationStatus
    pendingWith?: string;
    isResignationStatusUpdated?: boolean;
    resignationStatus?: string;
    resignationStatusUpdatedBy?: string;
    resignationStatusUpdatedDateTime?: Date;
    resignationStatusComment?: string;
    teamNotification?: boolean;
    clientsOrVendors?: boolean;
    exitAnnouncement?: boolean;

    //KnowledgeSharing
    isKnowledgeSharingUpdated?: boolean;
    knowledgeSharingUpdatedBy?: string;
    knowledgeSharingUpdatedDateTime?: Date;
    handover?: boolean;
    accessCredentials?: boolean;
    knowledgeSharing?: boolean;

    //IT
    assetReturn?: string;
    assetReturnDateTime?: Date;
    assetReturnBy?: string;
    isITAccessRevocation?: boolean;
    itAccessRevocationDateTime?: Date;
    itAccessRevocationBy?: string;
    hasDataBackup?: boolean;
    dataBackupDateTime?: Date;
    dataBackupBy?: string;
    isITUpdated?: boolean;
    itUpdatedBy?: string;
    itUpdatedDateTime?: Date;

    //Finance
    hasOutstandingBills?: boolean;
    outstandingBills?: number;
    isClearanceCompleted?: boolean;
    clearanceStatus?: string;
    providentFund?: number;
    gratuity?: number;
    deductions?: number;
    finalSalaryPayment?: number;
    finalSettlementAgreement?: string;
    finalSettlementStatus?: string;
    isFinanceUpdated?: boolean;
    financeUpdatedBy?: string;
    financeUpdatedDateTime?: Date;

    //Interview by HR
    isExitFormsFilled?: boolean;
    feedbackCollection?: string;
    improvements?: string;
    neutralEnvironment?: string;
    isExitInterviewCompleted?: boolean;
    isEmploymentAgreementReviewed?: boolean;
    employmentAgreementReviewedBy?: string;
    employmentAgreementReviewedDateTime?: Date;
    exitInterviewNotes?: string;
    exitApprovedBy?: string;
    exitDateTime?: Date;
    exitReason?: string;

    //Administrations
    nonDisclosureAgreement?: string;
    nonCompeteClause?: string;
    governmentCompliance?: string;

    //POST EXIT
    isRelievingLetterIssued?: boolean;
    relievingLetterIssuedBy?: string;
    relievingLetterIssuedDateTime?: Date;
    experienceCertificateIssued?: boolean;
    experienceCertificateIssuedBy?: string;
    experienceCertificateIssuedDateTime?: Date;
    healthInsurance?: boolean;
    pensionOrRetirementFunds?: boolean;

    status?: string;
}