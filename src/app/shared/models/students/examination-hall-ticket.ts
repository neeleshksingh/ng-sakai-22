import { AuditModel } from "../commons/audit-model";

export class ExaminationHallTicketSearch {
    examinationId?: number;
    academicSessionId?: number;
    programId?: number;
    operationalVerticalId?: number;
    registrationNumber?: string;
}
export class ExaminationHallTicket extends AuditModel {
    id?: number;
    // hallTicketNumber?: string;
    examinationId?: number;
    academicSessionId?: number;
    programId?: number;
    facultyId?: number;
    operationalVerticalId?: number;
    studentId?: string;
    registrationNumber?: string;
    rollNumber?: string;
    type?: string;
    status?: string;
}
export class ExaminationHallTicketSubjectPaperCode extends AuditModel {
    examinationHallTicketId?: number;
    subjectId?: number;
    subjectPaperCodeId?: number;
    status?: string;
}
export class ExaminationHallTicketSubjectPaperCodeResponse extends ExaminationHallTicketSubjectPaperCode {
    subjectName?: string;
    subjectPaperCodeName?: string;
    examinationDate?: Date;
    fromTime?: string;
    toTime?: string;
}
export class ExaminationHallTicketResponse extends ExaminationHallTicket {
    examinationName?: string;
    academicSessionName?: string;
    programName?: string;
    programCode?: string;
    facultyName?: string;
    operationalVerticalName?: string;
    hallTicketNumber?: string;
    studentName?: string;
    fathersName?: string;
    dateOfBirth?: Date;
    gender?: string;
    studentImage?: string;
    examinationHallTicketSubjectPaperCodeResponseList?: ExaminationHallTicketSubjectPaperCodeResponse[];
}