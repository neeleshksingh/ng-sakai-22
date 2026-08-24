import { AuditModel } from "../commons/audit-model";

export class FacultyBatchAttendance extends AuditModel {
    employeeCode?: string;
    employeeName?: string;
    academicSessionId?: number;
    academicSessionName?: string;
    programId?: number;
    programName?: string;
    paperTypeId?: number;
    paperTypeName?: string
    operationalVerticalId?: number;
    operationalVerticalName?: string;
    section?: string;
    subjectPaperCodeId?: string;
    subjectPaperCodeName?: string;
    subjectId?: number;
    subjectName?: string;
    date?: Date;
    attendanceStatus?: number;
    attendanceStatusName?: string;
    totalStudent?: number;
    totalPresent?: number;
    totalAbsent?: number;
    present?: number;
    absent?: number;
    attendancePercentage?: string;

    uniqueId?: string; // To uniquely identify each record for my purpose.
    fullProgramName?: string; // To hold full program name for tooltip purpose.
}