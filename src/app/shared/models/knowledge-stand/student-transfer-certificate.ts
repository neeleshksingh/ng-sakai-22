import { BaseModel } from "../commons/base-model";


export class StudentTransferCertificate extends BaseModel {
    studentTransferCertificateNumber?: string;
    academicSessionId?: number;
    programId?: number;
    operationalVerticalId?: number;
    registrationNumber?: string;
    sgpa?: number;
    cgpa?: number;
    backlogCount?: number;
    dueAmount?: number;
    passingMonth?: string;
    passingYear?: string;
    issueDate?: Date;
    remarks?: string;
    reasonForTransfer?: string;
}

export class StudentTransferCertificateResponse extends StudentTransferCertificate {
    academicSessionName?: string;
    programName?: string;
    operationalVerticalName?: string;
    studentName?: string;
    fathersName?: string;
    mothersName?: string;
}
export class StudentTransferCertificateFileUrl {
    fileUrl?: string;
}