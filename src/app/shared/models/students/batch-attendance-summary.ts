import { OperationalVertical } from "./operational-vertical";


export class BatchAttendanceSummary {
    studentId?: string;
    registrationNumber?: string;
    programId?: number;
    programName?: string;
    operationalVerticalId?: number;
    operationalVerticalName?: string;
    operationalVerticalType?: string;
    subjectPaperCodeId?: number;
    subjectPaperCodeName?: string;
    batchCode?: string;
    totalScheduled?: number;
    totalClassConducted?: number;
    totalPresent?: number;
    totalAbsent?: number;
    attendancePercentage?: number;
    subjectName?: string;
    operationalVertical?: OperationalVertical;
}