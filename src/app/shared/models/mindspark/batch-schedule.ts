import { AuditModel } from "../commons/audit-model";

export class BatchScheduleRequest extends AuditModel{
    id?: number;
    batchCode?: string;
    cycle?: number;
    originalScheduleDate?:any;
    scheduleDate?: any;
    duration?: number;
    startTime?: string;
    endTime?: string;
    isManualUpdate?: boolean;
    isAttendanceUpdated?: boolean;
    attendanceMarkedBy?: string;
    attendanceMarkedDate?:Date;
    status?: string;
}

export class BatchScheduleResponse extends BatchScheduleRequest {
    minDateSelection?:Date;
    subjectPaperCodeModuleName?: string;
    subjectPaperCodeModuleSubModuleName?: string;
}