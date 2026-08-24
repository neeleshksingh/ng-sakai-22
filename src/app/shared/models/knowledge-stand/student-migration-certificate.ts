import { AuditModel } from "../commons/audit-model";



export class StudentMigrationCertificate extends AuditModel {
    id?: number;
    studentMigrationCertificateNumber?: string;
    academicSessionId?: number;
    programId?: number;
    operationalVerticalId?: number;
    registrationNumber?: string;
    sgpa?: number;
    cgpa?: number;
    passingYear?: string;
    issueDate?: Date;
    status?: string;
    remarks?: string;
    reasonForMigration?: string;
}

export class StudentMigrationCertificateResponse extends StudentMigrationCertificate {
    academicSessionName?: string;
    programName?: string;
    operationalVerticalName?: string;
    studentName?: string;
    fathersName?: string;
    mothersName?: string;
}

export class StudentMigrationCertificateFileUrl {
    fileUrl?: string;
}