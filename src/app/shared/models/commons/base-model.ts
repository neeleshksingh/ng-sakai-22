import { AuditModel } from "./audit-model";

export class BaseModel extends AuditModel {
    id?: number;
    name?: string;
    title?: string;
    description?: string;
    status?: string;
}