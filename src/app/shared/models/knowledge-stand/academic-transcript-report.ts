import { AuditModel } from "../commons/audit-model";

export class AcademicTranscriptReportUrlResponse {
    fileUrl?: string;
    registrationNumber?: string;
    failureReason?: string;
}

export class AcademicTranscriptReportData extends AuditModel {
    id?: number;
    academicSessionId?: number;
    academicSessionName?: string;
    programId?: number;
    programName?: string;
    studentName?: string;
    registrationNumber?: string;
    fathersName?: string;
    mothersName?: string;
    batchYear?: string;
    mode?: string;
    dob?: Date;
    identityImagePath?: string;
    issueDate?: Date;
    transcriptCertificateNumber?: string;
    rollNumber?: string;
    totalBacklogCount?: number;
    hasBacklog?: boolean;
    hadAnyBacklog?: boolean;
    academicTranscriptOperationalVerticals?: AcademicTranscriptOperationalVerticals[];
}

export class AcademicTranscriptOperationalVerticals {
    id?: number;
    academicTranscriptReportId?: number;
    registrationNumber?: string;
    operationalVerticalId?: number;
    operationalVerticalName?: string;
    sgpa?: number;
    cgpa?: number;
    examinationName?: string;
    resultPublishDate?: Date;
    academicTranscriptSubjects?: AcademicTranscriptSubjects[];
}

export class AcademicTranscriptSubjects {
    id?: number;
    academicTranscriptReportId?: number;
    registrationNumber?: string;
    operationalVerticalId?: number;
    slNo?: number;
    subjectPaperCodeId?: number;
    subjectPaperCodeName?: string;
    subjectId?: number;
    subjectName?: string;
    obtainedMarks?: string;
    grade?: string;
    credit?: string
}