export class StudentStatus {
    createdBy?: string;
    modifiedBy?: string;
    createdDate?: Date;
    modifiedDate?: Date;
    id?: number;
    academicSessionId?: number;
    academicSessionName?: string;
    programId?: number;
    programName?: string;
    operationalVerticalId?: number;
    operationalVerticalName?: string;
    studentName?: string;
    studentId?: string;
    registrationNumber?: string;
    studentStatusDescriptionId?: number;
    studentStatusDescriptionName?: string;
    statusDescription?: string;
    startDate?: Date | string | null;
    endDate?: Date | string | null;
    requestedDate?: Date | string | null;
    approvedDate?: Date | string | null;
    description?: string;
    isRestore?: Boolean;
    restoreDate?: string;
    restoreDescription?: string;
    restoreBy?: string;
    status?: string;
}