import { OperationalVertical } from "../cloudbytes/operational-vertical";
import { AuditModel } from "../commons/audit-model";
import { Batch } from "./batch";

export class BatchAttendance extends AuditModel {
    id?: number;
    academicSessionProgramId?: number;
    academicSessionName?: string;
    batchCode?: string;
    scheduleDate?: Date;
    registrationNumber?: string;
    studentName?: string;
    batchScheduleId?: number;
    cycle?: number;
    subjectPaperCodeModuleName?: string;
    subjectPaperCodeModuleSubModuleName?: string;
    isPresent?: boolean = false;
    notes?: string = "";
    status?: string;
    subjectPaperCodeId?: number;

    studentId?: string;
    programId?: number;
    programName?: string;
    operationalVerticalId?: number;
    operationalVerticalName?: string;
    operationalVerticalType?: string;
    subjectPaperCodeName?: string;
    totalScheduled?: number;
    totalClassConducted?: number;
    totalPresent?: number;
    totalAbsent?: number;
    attendancePercentage?: number;
    subjectName?: string;
    operationalVertical?: OperationalVertical;

    rollNumber?: string;
    academicSessionId?: number;
    section?: string;
    subSection?: string;
    subjectId?: number;
    date?: Date;
    period?: string;
    startTime?: string;
    endTime?: string;
    attendanceType?: number;
    paymentStatusMessage?: string;
    paymentStatus?: string;
    batchStartDate?: Date;
}
export class BatchAttendanceData {
    batch?: Batch;
    batches?: Batch[];
    pendingAttendace?: BatchAttendance[];
}