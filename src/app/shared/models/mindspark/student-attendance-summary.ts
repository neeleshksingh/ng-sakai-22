export class StudentAttendanceSummary{
    academicSessionId?: number;
    programId?: number;
    subjectId?: number;
    primaryFacultyCode?: string;
    operationalVerticalId?: number;
    subjectPaperCodeId?: number;
    batchCode?: string;
    section?: string;
    registrationNumber?: string;
    totalPresent?: number;
    totalAbsent?: number;
    totalClassScheduled?: number;
    totalClassConducted?: number;
    attendancePercentage?: number;
    creditUnit?: number;
}