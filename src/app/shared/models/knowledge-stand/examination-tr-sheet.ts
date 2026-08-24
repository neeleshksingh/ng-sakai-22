import { AuditModel } from "../commons/audit-model";


export class TRRequest {
    examinationId?: number;
    academicSessionId?: number;
    programId?: number;
    operationalVerticalId?: number;
}

export class TRDataRequest {
    examinationId?: number;
    academicSessionId?: number;
    programId?: number;
    operationalVerticalId?: number;
    registrationNumber?: string;
    trSheetReportVersion?: string;
}

export class ExaminationTRSheet extends AuditModel {
    id?: number;
    examinationId?: number;
    academicSessionId?: number;
    programId?: number;
    operationalVerticalId?: number;
    examStartDate?: string;
    trStudents?: TrStudent[];

}
export class ExaminationTRSheetResponse extends ExaminationTRSheet {
    examinationName?: string;
    academicSessionName?: string;
    programName?: string;
    operationalVerticalName?: string;
    isProcessed?: boolean;
    processedBy?: string;
    processedDateTime?: Date;
    isResultPublished?: boolean;
    resultPublishedBy?: string;
    resultPublishedDateTime?: Date;
    trFileUrl?:string;
}
export class TrStudent extends AuditModel {
    id?: number;
    examinationTRSheetId?: number;
    studentId?: number;
    registraionNumber?: string;
    studentName?: string;
    trStudentPaperCodes?: TrStudentPaperCode[];
    trStudentConsolidated?: TrStudentConsolidated;
}
export class TrStudentPaperCode extends AuditModel {
    id?: number;
    trStudentId?: string;
    subjectId?: number;
    subjectName?: string;
    subjectPaperCodeId?: number;
    subjectPaperCode?: string;
    creditPoint?: number;
    trStudentPaperCodeMarks?: TrStudentPaperCodeMarks;

}

export class TrStudentPaperCodeMarks extends AuditModel {
    id?: number;
    trStudentPaperCodeId?: number;
    assignment?: number;
    attendance?: number;
    midSem?: number;
    endSem?: number;
    total?: number;
    gradePoint?: number;
    grade?: string;
    credit?: number;
    grace?: number;
    earnCredit?: number;
    isActive?: boolean;
    attendanceStatus?:string;
}

export class TrStudentConsolidated extends AuditModel {
    id?: number;
    trStudentId?: number;
    obtainedMarks?: number;
    totalMarks?: number;
    backlogCount?: number;
    sGPA?: number;
    cGPA?: number;
    result?: string;
    regCredit?: number;
    totalGradePoint?: number;
    earnCredits?: number;
    eGP?: number;
    isActive?: boolean;

}

export class TrSubjectPaperCode extends AuditModel {
    id?: number;
    serialNumber?: number;
    subjectPaperCodeId?: number;
    subjectPaperCode?: string;
    subjectName?: string;
    creditPoint?: number;
}