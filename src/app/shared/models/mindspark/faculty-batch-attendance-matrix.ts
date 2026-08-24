export class FacultyBatchAttendanceMatrix {
    academicSessionId?: number;
    programId?: number;
    operationalVerticalId?: number;
    subjectPaperCodeId?: number;
    batchCode?: string;
    primaryFacultyCode?: string;
    totalScheduled?: number;
    totalConducted?: number;
    totalStudentCount?: number;
    totalConductedCount?: number;
    totalPresentCount?: number;
    totalAbsentCount?: number;
    aggregateAttendance?: number;

    academicSessionName?: string;
    programName?: string;
    operationalVerticalName?: string;
    subjectPaperCodeName?: string;
    facultyName?: string;
}