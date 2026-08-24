import { IdNameExpando } from "../commons/id-name";
import { StudentAttendanceSummary } from "./student-attendance-summary";
import { SubjectPaperCodeSummary } from "./subject-paper-code-summary";

export class StudentBatchAttendanceReport {
    studentId?: string;
    registrationNumber?: string;
    academicSessionId?: number;
    academicSessionName?: string;
    programId?: number;
    programName?: string;
    operationalVerticalId?: number;
    operationalVerticalName?: string;
    operationalVerticalType?: string;
    subjectPaperCodeId?: number;
    subjectPaperCodeName: string = '';
    subjectId?: number;
    subjectName?: string;
    batchCode?: string;
    section?: string;
    recentAttendance?: boolean[];
    primaryFacultyCode?: string;
    batchStartDate?: string;
    totalScheduled?: string;
    totalClassConducted?: string;
    totalPresent?: number;
    totalAbsent?: number;
    attendancePercentage?: number;
    teacherName?: string;
    creditUnit?: number;
}

export class StudentBatchAttendanceSummaryDataResponse {
    studentExpando: IdNameExpando[] = [];
    academicSessionExpando: IdNameExpando[] = [];
    programExpando: IdNameExpando[] = [];
    operationalVerticalExpando: IdNameExpando[] = [];
    subjectExpando: IdNameExpando[] = [];
    subjectPaperCodeExpando: IdNameExpando[] = [];
    subjectPaperCodeSummaryList: SubjectPaperCodeSummary[] = [];
    studentAttendanceSummaryList: StudentAttendanceSummary[] = [];
    operationalVerticalAttendancePercentageList: OperationalVerticalAttendancePercentage[] = [];
}

export class StudentBatchAttendanceSummaryOperationalVerticalWise {
    operationalVertical?: string;
    isRecentAttendanceDisplay?: boolean;
    studentBatchAttendanceReport: StudentBatchAttendanceReport[] = [];
    aggregateAttendance?: number;
}

export class StudentBatchAttendanceSummaryRegistrationNumberWise {
    programNameWithRegistrationNumber?: string;
    registrationNumber?: string;
    studentBatchAttendanceSummaryOperationalVerticalWise: StudentBatchAttendanceSummaryOperationalVerticalWise[] = [];
}

export class OperationalVerticalAttendancePercentage {
    aggregateAttendancePercentage?: number;
    operationalVerticalId?: number;
}