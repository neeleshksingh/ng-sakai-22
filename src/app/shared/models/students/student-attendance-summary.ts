export class StudentAttendanceSummary {
    academicSessionId?: number;
    programId?: number;
    operationalVerticalId?: number;
    operationalVerticalName?: string;
    subjectId?: number;
    subjectName?: string;
    subjectPaperCodeId?: number;
    subjectPaperCodeName?: string;
    creditUnit?: number;
    batchCode?: string;
    section?: string;
    primaryFacultyCode?: string;
    registrationNumber?: string;
    totalClassScheduled?: number;
    totalClassConducted?: number;
    totalClassPending?: number;
    totalPresent?: number;
    totalAbsent?: number;
    attendancePercentage?: number;
}