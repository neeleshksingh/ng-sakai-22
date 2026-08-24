import { BaseModel } from "../commons/base-model";

export class StudentBatchAttendance extends BaseModel {
    studentName?: string;
    scheduleDate?: string;
    startTime?: string;
    endTime?: string;
    duration?: number;
    subjectPaperCodeId?: number;
    cycle?: string;
    batchCode?: string;
    registrationNumber?: string;
    batchScheduleId?: number;
    isPresent?: boolean;
}