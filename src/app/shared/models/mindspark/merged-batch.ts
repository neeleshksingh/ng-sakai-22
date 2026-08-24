import { AuditModel } from "../commons/audit-model";
import { BatchScheduleMaster } from "./batch-schedule-master";

export class MergedBatch extends AuditModel {
    id?: number;
    subjectId?: number;
    subjectPaperCodeId?: number;
    batchCode?: string;
    primaryFacultyCode?: string;
    secondaryFacultyCode?: string;
    
    startDate?: Date;
    batchCapacity?: number;
    batchScheduleMasterId?: BatchScheduleMaster;
    subjectPaperCodeModuleSubModuleId?: number;
    description?: string;
    status?: string;
    isScheduleGenerated?: boolean;
    
    paperCodeCycle?: string;
    lastBatchScheduleCycle?: string;

    version?: string;
}