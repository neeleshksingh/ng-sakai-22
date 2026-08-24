import { AuditModel } from "../commons/audit-model";

export class StudentBatchAttendance extends AuditModel {
    studentName?: string;
    scheduleDate?: string;
    startTime?: string;
    endTime?: string;
    duration?: number;
    id?: number;
    subjectPaperCodeId?: number;
    cycle: string = '';
    batchCode?: string;
    registrationNumber?: string;
    batchScheduleId?: number;
    isPresent?: boolean;
    status?: string;
  
}