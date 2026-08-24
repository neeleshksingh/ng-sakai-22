import { BaseModel } from "../commons/base-model";

export class StudentProvisionalCertificate extends BaseModel {
    studentProvisionalCertificateNumber?: string;
    academicSessionId?: number;
    programId?: number;
    operationalVerticalId?: number;
    registrationNumber?: string;
    passingMonth?: string;
    sgpa?: number;
    cgpa?: number;
    gradePoint?: number;
    passingYear?: string;
    issueDate?: Date;

}

export class StudentProvisionalCertificateResponse extends StudentProvisionalCertificate {
    academicSessionName?: string;
    programName?: string;
    operationalVerticalName?: string;
    studentName?: string;
    fathersName?: string;
    mothersName?: string;
}

export class StudentProvisionalCertificateFileUrl {
    fileUrl?: string;
}