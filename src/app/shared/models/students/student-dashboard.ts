
import { IdNameExpando } from "../commons/id-name";
import { StudentAttendanceSummary } from "../mindspark/student-attendance-summary";
import { SubjectPaperCodeSummary } from "./subject-paper-code-summary";

export class StudentDashboardTiles {
    id?: number;
    name?: string;
    title?: string;
    description?: string;
    status?: string;
}

export class StudentDashboardAttendanceGraphData {
    labels?: string[];
    datasets?: DataSet[];
}

export class DataSet {
    label?: string;
    backgroundColor?: string;
    borderColor?: string;
    data?: number[];
}

export class StudentAcademicScheduleEvent {
    data?: StudentAcademicSchedule[];
}

export class StudentAcademicSchedule {
    id?: number;
    title?: string;
    start?: Date;
    end?: Date;
    url?: string;
    allDay?: boolean;
    backgroundColor?: string;
}

export class StudentDashboardAcademicsCalendarData {
    studentAcademicScheduleEvent?: StudentAcademicScheduleEvent;
}

export class StudentDashboardNotifications {
    noticeDate?: Date;
    source?: string;
    senderImageUrl?: string;
    id?: number;
    name?: string;
    title?: string;
    description?: string;
    attachmentUrl?: string;
    messageSenderImageUrl?: string;
    status?: string;
}

export class StudentDashboard {
    studentDashboardTiles?: StudentDashboardTiles[];
    studentBatchAttendanceSummaryDataExpando?: StudentBatchAttendanceSummaryDataExpando;
    studentDashboardAcademicsCalendarData?: StudentDashboardAcademicsCalendarData;
    studentDashboardNotifications?: StudentDashboardNotifications[];
}

export class StudentBatchAttendanceSummaryDataExpando {
    academicSessionExpando?: IdNameExpando[];
    programExpando?: IdNameExpando[];
    operationalVerticalExpando?: IdNameExpando[];
    subjectPaperCodeExpando?: IdNameExpando[];
    studentExpando?: IdNameExpando [];
    subjectPaperCodeSummaryList?: SubjectPaperCodeSummary[];
    studentAttendanceSummaryList?: StudentAttendanceSummary[];
}