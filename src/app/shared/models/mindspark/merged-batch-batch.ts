import { AuditModel } from "../commons/audit-model";

export class MergedBatchBatch extends AuditModel {
    id?: number;
    mergedBatchId?: number;
    batchId?: number;
    status?: string;
}