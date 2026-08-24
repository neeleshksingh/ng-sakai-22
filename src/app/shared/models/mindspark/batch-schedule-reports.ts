import { AuditModel } from "../commons/audit-model";

export class BatchScheduleReports extends AuditModel {
    batchCode?: string;
    subjectPaperCodeId?: number;
    subjectPaperCodeName?: string;
    version?: string;
    subjectPaperCodeModuleId?: number;
    subjectPaperCodeModuleName?: string;
    subjectPaperCodeModuleSubModuleId?: number;
    subjectPaperCodeModuleSubModuleName?: string;
    cycle?: number;
    batchScheduleId?: number;
    originalScheduleDate?: Date;
    scheduleDate?: Date;
    startTime?: Date;
    endTime?: Date;
    isManualUpdate?: boolean;
    isAttendanceUpdated?: boolean;
    attendanceMarkedBy?: string;
    attendanceMarkedDate?: Date
}