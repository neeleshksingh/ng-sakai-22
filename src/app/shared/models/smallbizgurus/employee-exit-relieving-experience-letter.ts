import { AuditModel } from "../commons/audit-model";

export class EmployeeExitRelievingExperienceLetter extends AuditModel {
    isRelievingLetterIssued?: boolean;
    relievingLetterIssuedBy?: string;
    relievingLetterIssuedDateTime?: Date;
    experienceCertificateIssued?: boolean;
    experienceCertificateIssuedBy?: string;
    experienceCertificateIssuedDateTime?: Date;
}