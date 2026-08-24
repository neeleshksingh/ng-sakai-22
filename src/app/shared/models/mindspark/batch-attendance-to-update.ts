import { Batch } from "./batch";

export class BatchAttendanceToUpdate {
    id?: number;
    duration?: number;
    batchCode?: string;
    originalScheduleDate?: Date;
    scheduleDate?: Date;
    registrationNumber?: string;
    studentName?: string;
    batchScheduleId?: number;
    cycle?: number;
    subjectPaperCodeModuleName?: string;
    subjectPaperCodeModuleSubModuleName?: string;
    isPresent?: boolean = false;
    notes?: string = "";
    createdDate?: Date;
    modifiedDate?: Date;
    status?: string;
    startTime?: string
    endTime?: string;
    isManualUpdate?: boolean;
    isAttendanceUpdated?: boolean;
    attendanceMarkedBy?: string;
    attendanceMarkedDate?: Date;
    subjectPaperCodeId?: number;
}
export class BatchAttendanceToUdateData {
    batch?: Batch;
    pendingAttendace?: BatchAttendanceToUpdate[];
}