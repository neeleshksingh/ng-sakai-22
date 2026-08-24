import { AuditModel } from "../commons/audit-model";

export class Batch extends AuditModel {
    id?: number;
    operationalVerticalSubjectId?: number;
    academicSessionId?: number;
    academicSessionName?: string;
    parentBatchCode?: string;
    batchCode?: string;
    section?: string;
    programId?: number;
    programName?: string;
    paperTypeId?: number;
    paperTypeName?: string;
    operationalVerticalId?: number;
    operationalVerticalName?: string;
    subjectId?: string;
    subjectName?: string;
    subjectPaperCodeId?: number;
    subjectPaperCodeName?: string;
    version?: string;
    primaryFacultyCode?: string;
    primaryFacultyName?: string;
    secondaryFacultyCode?: string;
    secondaryFacultyName?: string;
    startDate?: any;
    endDate?: string;
    batchCapacity?: number;
    availableBatchCapacity?: number;
    batchScheduleMasterId?: number;
    batchScheduleMasterName?: string;
    subjectPaperCodeModuleSubModuleId?: number;
    subjectPaperCodeModuleSubModuleName?: string;
    programSpecializationId?: number;
    programSpecializationName?: string;
    lastBatchScheduleCycle?: string;
    lastAttendanceMarkedCycle?: string;
    lastAttendanceMarkedDateTime?: string;
    firstUpcomingAttendancePendingCycle?: string;
    firstUpcomingAttendancePendingCycleDateTime?: string;
    description?: string;
    status?: string;
    cycle?: string;
    isScheduleGenerated?: boolean;
}

export class BatchResponse extends Batch {
    isClosed?: boolean;
    closedDate?: Date;
    closedBy?: string;
    closedReason?: string;
}